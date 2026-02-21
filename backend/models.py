"""
Pydantic schemas for the Cimas iGo Vision AI backend.

Covers:
  - AnalyzeRequest  – validated query params / form metadata
  - NutritionAnalysis – the core AI-generated nutrition result
  - AnalyzeResponse  – top-level API envelope sent to the frontend
  - ErrorDetail      – standardised error payload
  - HealthResponse   – /health check response body
"""

from __future__ import annotations

from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


# ─── Enums ────────────────────────────────────────────────────────────────────


class GlycemicIndex(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class MealType(str, Enum):
    BREAKFAST = "Breakfast"
    LUNCH = "Lunch"
    DINNER = "Dinner"
    SNACK = "Snack"


class Verdict(str, Enum):
    EXCELLENT = "Excellent"
    GOOD = "Good"
    FAIR = "Fair"
    POOR = "Poor"


# ─── Core Nutrition Model ─────────────────────────────────────────────────────


class NutritionAnalysis(BaseModel):
    """
    Full AI-generated nutritional breakdown for a scanned meal.
    All fields with defaults are optional so that partial Gemini responses
    still pass validation — the frontend handles missing fields gracefully.
    """

    # ── Required core fields ──────────────────────────────────────────────────
    meal_name: str = Field(
        ...,
        min_length=1,
        max_length=120,
        description="Human-readable meal name identified by the AI",
        examples=["Grilled Chicken Salad"],
    )
    calories: int = Field(
        ..., ge=0, le=10_000, description="Total calories (kcal) for the meal"
    )
    protein: int = Field(
        ..., ge=0, le=500, description="Total protein in grams"
    )
    carbs: int = Field(
        ..., ge=0, le=1000, description="Total carbohydrates in grams"
    )
    fat: int = Field(
        ..., ge=0, le=500, description="Total fat in grams"
    )
    health_score: int = Field(
        ..., ge=1, le=100, description="Overall health score from 1–100"
    )
    igo_tip: str = Field(
        ...,
        min_length=10,
        max_length=500,
        description="Encouraging wellness tip from the Cimas iGo AI nutritionist",
    )

    # ── Extended fields (all optional) ───────────────────────────────────────
    ingredients: Optional[List[str]] = Field(
        default=None,
        max_length=20,
        description="List of detected ingredients (max 20)",
    )
    fiber: Optional[float] = Field(
        default=None, ge=0, le=150, description="Dietary fiber in grams"
    )
    sugar: Optional[float] = Field(
        default=None, ge=0, le=500, description="Total sugar in grams"
    )
    sodium: Optional[int] = Field(
        default=None, ge=0, le=10_000, description="Sodium in milligrams"
    )
    sat_fat: Optional[float] = Field(
        default=None, ge=0, le=200, description="Saturated fat in grams"
    )
    glycemic_index: Optional[GlycemicIndex] = Field(
        default=None, description="Estimated glycemic index category"
    )
    meal_type: Optional[MealType] = Field(
        default=None, description="Inferred meal occasion"
    )
    ai_confidence: Optional[int] = Field(
        default=None,
        ge=1,
        le=100,
        description="AI confidence percentage for the identification",
    )
    verdict: Optional[Verdict] = Field(
        default=None, description="High-level nutritional verdict"
    )
    ai_insights: Optional[List[str]] = Field(
        default=None,
        max_length=5,
        description="Up to 5 personalised AI insights for the user",
    )

    # ── Validators ────────────────────────────────────────────────────────────

    @field_validator("ingredients")
    @classmethod
    def cap_ingredients(cls, v: Optional[List[str]]) -> Optional[List[str]]:
        if v is not None:
            # Trim to 20 items and strip blank entries
            return [i.strip() for i in v if i.strip()][:20]
        return v

    @field_validator("ai_insights")
    @classmethod
    def cap_insights(cls, v: Optional[List[str]]) -> Optional[List[str]]:
        if v is not None:
            return [i.strip() for i in v if i.strip()][:5]
        return v

    @field_validator("health_score")
    @classmethod
    def derive_verdict(cls, v: int) -> int:
        # Keep health_score as-is; verdict is set separately by the service
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "meal_name": "Grilled Chicken Salad",
                "calories": 480,
                "protein": 42,
                "carbs": 28,
                "fat": 18,
                "health_score": 87,
                "igo_tip": "Great choice! Pair with a glass of water to hit your Cimas iGo hydration goal.",
                "ingredients": ["Chicken breast", "Romaine lettuce", "Cherry tomatoes", "Feta"],
                "fiber": 6.2,
                "sugar": 5.4,
                "sodium": 380,
                "sat_fat": 3.8,
                "glycemic_index": "Low",
                "meal_type": "Lunch",
                "ai_confidence": 94,
                "verdict": "Excellent",
                "ai_insights": [
                    "You're 40g short of today's protein goal — this meal closes 28% of the gap.",
                    "Low glycemic index: blood sugar stays stable for the next 3–4 hours.",
                ],
            }
        }


# ─── API Envelope ─────────────────────────────────────────────────────────────


class AnalyzeResponse(BaseModel):
    """Top-level envelope returned by POST /analyze."""

    success: bool = True
    data: NutritionAnalysis
    processing_time_ms: Optional[int] = Field(
        default=None, description="Time taken by the Gemini API call in milliseconds"
    )
    model_used: Optional[str] = Field(
        default=None, description="Gemini model identifier used for this analysis"
    )


# ─── Error Model ──────────────────────────────────────────────────────────────


class ErrorDetail(BaseModel):
    """Standardised error payload for non-2xx responses."""

    success: bool = False
    error_code: str = Field(
        ..., description="Machine-readable error code", examples=["IMAGE_TOO_LARGE"]
    )
    message: str = Field(
        ..., description="Human-readable error message for the frontend"
    )
    detail: Optional[str] = Field(
        default=None, description="Additional technical detail (dev mode only)"
    )


# ─── Health Check ─────────────────────────────────────────────────────────────


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
    model: str
    environment: str
