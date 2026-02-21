"""
Gemini Vision service for the Cimas iGo AI nutrition analysis pipeline.

Flow:
  1.  Receive base64-encoded image + MIME type from the image utility.
  2.  Build a structured multipart prompt (text instruction + inline image data).
  3.  Call the Gemini API with temperature=0.2 for consistency.
  4.  Extract and clean the raw JSON from the model's text response.
  5.  Validate and return a NutritionAnalysis Pydantic model.
  6.  Derive any missing optional fields (verdict, ai_confidence, etc.).
"""

from __future__ import annotations

import json
import logging
import re
import time
from typing import Any, Dict, Optional, Tuple

import google.generativeai as genai
from pydantic import ValidationError

from models import NutritionAnalysis, GlycemicIndex, MealType, Verdict

logger = logging.getLogger(__name__)

# ─── System Prompt ────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an expert nutritionist for Cimas Health Group Zimbabwe, powering the Cimas iGo Wellness Program.

Your task is to analyse a food/meal image and return a COMPREHENSIVE nutritional breakdown as a single raw JSON object.

CRITICAL RULES:
1. Return ONLY raw JSON — no markdown fences, no explanations, no preamble.
2. Every field listed below MUST be present in the response.
3. All numeric values must be integers or floats (not strings).
4. The "igo_tip" field must be encouraging, mention a specific Cimas iGo value (hydration, protein, balance, etc.), and be 1–3 sentences long.
5. The "ai_insights" must be exactly 3 strings — each a specific, data-driven observation about this meal.
6. If you cannot confidently identify the food, still make your best educated estimate and set "ai_confidence" to a low value (10–40).

REQUIRED JSON SCHEMA:
{
  "meal_name": "<string: identified dish name, max 60 chars>",
  "calories": <int: total kcal>,
  "protein": <int: grams>,
  "carbs": <int: grams>,
  "fat": <int: grams>,
  "sat_fat": <float: saturated fat grams>,
  "fiber": <float: dietary fiber grams>,
  "sugar": <float: total sugar grams>,
  "sodium": <int: milligrams>,
  "health_score": <int: 1–100 overall healthiness score>,
  "glycemic_index": "<string: Low | Medium | High>",
  "meal_type": "<string: Breakfast | Lunch | Dinner | Snack>",
  "ai_confidence": <int: 1–100, your confidence in the identification>,
  "verdict": "<string: Excellent | Good | Fair | Poor>",
  "ingredients": [<string: ingredient 1>, <string: ingredient 2>, ...],
  "ai_insights": [
    "<string: insight 1 — specific, data-driven, references a number>",
    "<string: insight 2 — different aspect from insight 1>",
    "<string: insight 3 — actionable recommendation>"
  ],
  "igo_tip": "<string: encouraging tip referencing Cimas iGo>"
}

SCORING GUIDE for health_score:
  90–100: Exceptional — nutrient-dense, low saturated fat, low sodium, high fiber
  75–89:  Good — generally healthy with minor trade-offs
  55–74:  Fair — moderate nutritional value, some concerns
  30–54:  Poor — high in saturated fat, sodium, or simple carbs
  1–29:   Very poor — highly processed or nutritionally lacking

VERDICT aligns with health_score:
  Excellent: 85–100
  Good: 65–84
  Fair: 45–64
  Poor: 1–44

Always produce all fields. The JSON must be valid and parseable."""

# ─── Service Class ────────────────────────────────────────────────────────────


class GeminiNutritionService:
    """
    Wraps the Google Gemini Vision API for meal nutrition analysis.
    Thread-safe; designed to be used as a singleton per FastAPI app lifetime.
    """

    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash") -> None:
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not set.")
        genai.configure(api_key=api_key)
        self.model_name = model_name
        self._model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=SYSTEM_PROMPT,
            generation_config=genai.types.GenerationConfig(
                temperature=0.2,           # Low temp = more consistent nutrition data
                top_p=0.85,
                max_output_tokens=1024,
                response_mime_type="text/plain",
            ),
        )
        logger.info("GeminiNutritionService initialised with model: %s", model_name)

    # ── Public method ─────────────────────────────────────────────────────────

    async def analyze(
        self,
        image_b64: str,
        mime_type: str,
        image_dimensions: Optional[Tuple[int, int]] = None,
    ) -> Tuple[NutritionAnalysis, int]:
        """
        Send the image to Gemini and return a validated NutritionAnalysis.

        Args:
            image_b64:         Base64-encoded image string.
            mime_type:         MIME type of the image (e.g. "image/jpeg").
            image_dimensions:  (width, height) — used in the user prompt hint.

        Returns:
            (NutritionAnalysis, processing_time_ms)
        """
        import asyncio
        import concurrent.futures

        user_prompt = self._build_user_prompt(image_dimensions)

        # Build multipart content for Gemini
        content_parts = [
            user_prompt,
            {"mime_type": mime_type, "data": image_b64},
        ]

        t_start = time.perf_counter()

        # Gemini SDK is synchronous — run in thread pool to avoid blocking the event loop
        loop = asyncio.get_running_loop()
        with concurrent.futures.ThreadPoolExecutor() as pool:
            response = await loop.run_in_executor(
                pool,
                lambda: self._model.generate_content(content_parts),
            )

        elapsed_ms = int((time.perf_counter() - t_start) * 1000)
        logger.info("Gemini responded in %d ms", elapsed_ms)

        raw_text = response.text
        logger.debug("Raw Gemini response: %s", raw_text[:500])

        analysis = self._parse_and_validate(raw_text)
        return analysis, elapsed_ms

    # ── Private helpers ───────────────────────────────────────────────────────

    def _build_user_prompt(self, dimensions: Optional[Tuple[int, int]]) -> str:
        dim_hint = ""
        if dimensions:
            w, h = dimensions
            dim_hint = f" (image size: {w}×{h}px)"
        return (
            f"Please analyse this meal image{dim_hint} and return comprehensive "
            "nutritional data following the exact JSON schema provided. "
            "Be as accurate as possible for portion sizes typical of a single serving."
        )

    def _parse_and_validate(self, raw_text: str) -> NutritionAnalysis:
        """
        Extract JSON from the raw Gemini text, then validate with Pydantic.
        Handles common Gemini quirks:
          - Wrapping the JSON in markdown code fences
          - Leading/trailing whitespace
          - Slight field naming variations
        """
        json_str = self._extract_json(raw_text)

        try:
            raw_dict: Dict[str, Any] = json.loads(json_str)
        except json.JSONDecodeError as exc:
            logger.error("JSON decode failed. Raw text: %s", raw_text[:1000])
            raise ValueError(
                f"Gemini returned malformed JSON. Parse error: {exc}"
            ) from exc

        # Normalise common Gemini naming variations
        raw_dict = self._normalise_keys(raw_dict)

        # Derive verdict from health_score if Gemini omitted it
        if "verdict" not in raw_dict or raw_dict.get("verdict") is None:
            raw_dict["verdict"] = self._score_to_verdict(raw_dict.get("health_score", 50))

        # Ensure ai_confidence has a value
        if "ai_confidence" not in raw_dict or raw_dict.get("ai_confidence") is None:
            raw_dict["ai_confidence"] = 85

        try:
            return NutritionAnalysis(**raw_dict)
        except ValidationError as exc:
            logger.error("Pydantic validation failed: %s", exc)
            raise ValueError(f"AI response failed validation: {exc}") from exc

    @staticmethod
    def _extract_json(text: str) -> str:
        """
        Strip markdown fences and extract the first {...} JSON object from text.
        """
        # Remove ```json ... ``` or ``` ... ``` fences
        text = re.sub(r"```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = text.replace("```", "").strip()

        # Find the outermost JSON object
        match = re.search(r"\{.*\}", text, flags=re.DOTALL)
        if not match:
            raise ValueError("No JSON object found in Gemini response.")
        return match.group(0)

    @staticmethod
    def _normalise_keys(d: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle common key variations Gemini may return (e.g. camelCase, spaces).
        """
        key_map = {
            "mealName": "meal_name",
            "meal name": "meal_name",
            "healthScore": "health_score",
            "health score": "health_score",
            "igoTip": "igo_tip",
            "igo tip": "igo_tip",
            "satFat": "sat_fat",
            "saturatedFat": "sat_fat",
            "saturated_fat": "sat_fat",
            "glycemicIndex": "glycemic_index",
            "mealType": "meal_type",
            "aiConfidence": "ai_confidence",
            "aiInsights": "ai_insights",
        }
        normalised = {}
        for k, v in d.items():
            normalised[key_map.get(k, k)] = v
        return normalised

    @staticmethod
    def _score_to_verdict(score: int) -> str:
        if score >= 85:
            return Verdict.EXCELLENT
        elif score >= 65:
            return Verdict.GOOD
        elif score >= 45:
            return Verdict.FAIR
        return Verdict.POOR
