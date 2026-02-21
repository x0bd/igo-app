"""
Cimas iGo Vision AI — FastAPI Backend
=====================================

  POST /analyze   — Analyse a meal image with Gemini Vision
  GET  /health    — Health check / readiness probe
  GET  /          — Root info

Run locally:
  uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

import logging
import os
import time
from contextlib import asynccontextmanager
from typing import Any, Dict

import structlog
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, Request, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from models import AnalyzeResponse, ErrorDetail, HealthResponse, NutritionAnalysis
from services.gemini_service import GeminiNutritionService
from utils.image import process_upload

# ─── Load environment ─────────────────────────────────────────────────────────

load_dotenv()

# ─── Logging setup ────────────────────────────────────────────────────────────

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
)

log = structlog.get_logger()

# ─── Settings ─────────────────────────────────────────────────────────────────

APP_VERSION = "1.0.0"
GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
HOST: str = os.getenv("HOST", "0.0.0.0")
PORT: int = int(os.getenv("PORT", "8000"))
ENV: str = os.getenv("ENV", "development")
MAX_IMAGE_SIZE_BYTES: int = int(os.getenv("MAX_IMAGE_SIZE_BYTES", str(10 * 1024 * 1024)))

_raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:8081,http://localhost:19006,http://localhost:3000",
)
ALLOWED_ORIGINS: list[str] = [o.strip() for o in _raw_origins.split(",") if o.strip()]

# ─── Global service instance (set during lifespan startup) ────────────────────

gemini_service: GeminiNutritionService | None = None


# ─── Lifespan ─────────────────────────────────────────────────────────────────


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown logic for the FastAPI application."""
    global gemini_service

    # ── Startup ──────────────────────────────────────────────────────────────
    if not GEMINI_API_KEY:
        log.error("GEMINI_API_KEY is not set — /analyze will be unavailable.")
    else:
        try:
            gemini_service = GeminiNutritionService(
                api_key=GEMINI_API_KEY,
                model_name=GEMINI_MODEL,
            )
            log.info(
                "Gemini service ready",
                model=GEMINI_MODEL,
                env=ENV,
                origins=ALLOWED_ORIGINS,
            )
        except Exception as exc:
            log.error("Failed to initialise Gemini service", error=str(exc))

    yield  # App is running

    # ── Shutdown ─────────────────────────────────────────────────────────────
    log.info("iGo Vision AI shutting down.")


# ─── App factory ──────────────────────────────────────────────────────────────


def create_app() -> FastAPI:
    app = FastAPI(
        title="Cimas iGo Vision AI",
        description="AI-powered meal nutrition analysis for the Cimas iGo Wellness Program.",
        version=APP_VERSION,
        docs_url="/docs" if ENV == "development" else None,
        redoc_url="/redoc" if ENV == "development" else None,
        lifespan=lifespan,
    )

    # ── CORS ─────────────────────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    # ── Request logging middleware ────────────────────────────────────────────
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        t0 = time.perf_counter()
        response = await call_next(request)
        elapsed = int((time.perf_counter() - t0) * 1000)
        log.info(
            "request",
            method=request.method,
            path=request.url.path,
            status=response.status_code,
            ms=elapsed,
        )
        return response

    # ── Global exception handler ─────────────────────────────────────────────
    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        log.error("Unhandled exception", path=request.url.path, error=str(exc))
        error = ErrorDetail(
            success=False,
            error_code="INTERNAL_SERVER_ERROR",
            message="An unexpected error occurred.",
            detail=str(exc) if ENV == "development" else None,
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error.model_dump(exclude_none=True),
        )

    # ── Routes ────────────────────────────────────────────────────────────────

    @app.get("/", response_model=Dict[str, Any], tags=["Meta"])
    async def root():
        """Root info endpoint — useful for deployment checks."""
        return {
            "service": "Cimas iGo Vision AI",
            "version": APP_VERSION,
            "environment": ENV,
            "docs": "/docs",
            "health": "/health",
            "analyze": "POST /analyze",
        }

    @app.get("/health", response_model=HealthResponse, tags=["Meta"])
    async def health():
        """
        Readiness probe endpoint.
        Returns 200 when the service is operational, 503 if Gemini is unavailable.
        """
        if gemini_service is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Gemini service is not initialised. Check GEMINI_API_KEY.",
            )
        return HealthResponse(
            status="ok",
            version=APP_VERSION,
            model=GEMINI_MODEL,
            environment=ENV,
        )

    @app.post(
        "/analyze",
        response_model=AnalyzeResponse,
        status_code=status.HTTP_200_OK,
        tags=["Nutrition"],
        summary="Analyse a meal image",
        description=(
            "Upload a JPEG, PNG, or WebP image of a meal. "
            "Returns a comprehensive AI-generated nutritional breakdown."
        ),
    )
    async def analyze_meal(
        image: UploadFile = File(
            ..., description="Meal photo. JPEG / PNG / WebP, max 10 MB."
        ),
    ):
        """
        Main endpoint — receives an image, validates it, calls Gemini, and returns
        a structured NutritionAnalysis with processing metadata.
        """
        # ── 1. Check service availability ────────────────────────────────────
        if gemini_service is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="AI service unavailable. Please try again later.",
            )

        # ── 2. Read and validate image bytes ─────────────────────────────────
        try:
            raw_bytes = await image.read()
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to read uploaded file: {exc}",
            )

        try:
            b64_image, mime_type, dimensions = process_upload(
                data=raw_bytes,
                max_size=MAX_IMAGE_SIZE_BYTES,
            )
        except ValueError as exc:
            _raise_400(str(exc), "IMAGE_INVALID")

        log.info(
            "Image accepted",
            filename=image.filename,
            size_kb=round(len(raw_bytes) / 1024, 1),
            dimensions=dimensions,
            mime=mime_type,
        )

        # ── 3. Call Gemini ────────────────────────────────────────────────────
        try:
            analysis, processing_ms = await gemini_service.analyze(
                image_b64=b64_image,
                mime_type=mime_type,
                image_dimensions=dimensions,
            )
        except ValueError as exc:
            log.error("Gemini analysis failed", error=str(exc))
            _raise_422(str(exc), "AI_PARSE_ERROR")
        except Exception as exc:
            error_str = str(exc).lower()
            if "resource_exhausted" in error_str or "quota" in error_str:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="API quota exceeded. Please try again later.",
                )
            if "invalid_argument" in error_str:
                _raise_400("Gemini could not process this image.", "IMAGE_REJECTED")
            log.error("Unexpected Gemini error", error=str(exc))
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="AI service returned an unexpected error.",
            )

        log.info(
            "Analysis complete",
            meal=analysis.meal_name,
            score=analysis.health_score,
            ms=processing_ms,
        )

        return AnalyzeResponse(
            success=True,
            data=analysis,
            processing_time_ms=processing_ms,
            model_used=GEMINI_MODEL,
        )

    return app


# ─── HTTP error helpers ───────────────────────────────────────────────────────


def _raise_400(message: str, code: str = "BAD_REQUEST") -> None:
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail={"success": False, "error_code": code, "message": message},
    )


def _raise_422(message: str, code: str = "UNPROCESSABLE") -> None:
    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail={"success": False, "error_code": code, "message": message},
    )


# ─── Entry point ──────────────────────────────────────────────────────────────

app = create_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=HOST,
        port=PORT,
        reload=ENV == "development",
        log_level="info",
    )
