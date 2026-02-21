"""
Image processing utilities for the Cimas iGo Vision AI backend.

Responsibilities:
  - Validate MIME type and file size of incoming uploads
  - Convert raw bytes to PIL Image objects
  - Normalise images (resize oversized images before sending to Gemini)
  - Convert PIL images to base64 for the Gemini multipart payload
  - Generate a lightweight thumbnail URI for the response (optional)
"""

from __future__ import annotations

import base64
import io
import logging
from typing import Tuple

from PIL import Image, UnidentifiedImageError

logger = logging.getLogger(__name__)

# ─── Constants ────────────────────────────────────────────────────────────────

ALLOWED_MIME_TYPES: set[str] = {"image/jpeg", "image/png", "image/webp", "image/heic"}
MAX_DIMENSION = 2048   # Gemini works well up to 2048 px; anything larger is trimmed
JPEG_QUALITY = 88      # Re-encode quality when resizing


# ─── Public API ───────────────────────────────────────────────────────────────


def validate_image_bytes(data: bytes, max_size: int) -> None:
    """
    Raise ValueError if:
      - data is empty
      - data exceeds max_size bytes
      - data is not a recognised image format
    """
    if not data:
        raise ValueError("Image data is empty.")

    if len(data) > max_size:
        mb = max_size / 1_048_576
        raise ValueError(f"Image exceeds the maximum allowed size of {mb:.0f} MB.")

    # Quick format sniff via PIL — raises UnidentifiedImageError for non-images
    try:
        with Image.open(io.BytesIO(data)) as img:
            img.verify()  # Detects corrupt files
    except UnidentifiedImageError:
        raise ValueError("Could not identify image format. Upload a JPEG, PNG, or WebP.")
    except Exception as exc:
        raise ValueError(f"Image validation failed: {exc}") from exc


def load_image(data: bytes) -> Image.Image:
    """
    Load raw bytes into a PIL Image, converting to RGB (strips alpha channel
    and handles HEIC/EXIF orientation via ImageOps.exif_transpose).
    """
    from PIL import ImageOps

    img = Image.open(io.BytesIO(data))

    # Apply EXIF orientation (e.g. iPhone portrait photos)
    img = ImageOps.exif_transpose(img) or img

    # Ensure RGB — Gemini needs RGB/JPEG, not RGBA or palette-mode
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    return img


def resize_if_needed(img: Image.Image, max_dim: int = MAX_DIMENSION) -> Image.Image:
    """
    Proportionally resize the image if either dimension exceeds max_dim.
    Returns the original image unchanged if within bounds.
    """
    w, h = img.size
    if w <= max_dim and h <= max_dim:
        return img

    ratio = min(max_dim / w, max_dim / h)
    new_w, new_h = int(w * ratio), int(h * ratio)
    logger.debug("Resizing image from %dx%d → %dx%d", w, h, new_w, new_h)
    return img.resize((new_w, new_h), Image.LANCZOS)


def image_to_base64(img: Image.Image, fmt: str = "JPEG") -> Tuple[str, str]:
    """
    Encode a PIL Image as a base64 string.

    Returns:
        (base64_string, mime_type)
        e.g. ("iVBORw0K...", "image/jpeg")
    """
    buf = io.BytesIO()
    save_fmt = fmt.upper()
    if save_fmt == "JPEG":
        img.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=True)
        mime = "image/jpeg"
    elif save_fmt == "PNG":
        img.save(buf, format="PNG", optimize=True)
        mime = "image/png"
    else:
        img.save(buf, format="JPEG", quality=JPEG_QUALITY)
        mime = "image/jpeg"

    encoded = base64.b64encode(buf.getvalue()).decode("utf-8")
    return encoded, mime


def process_upload(data: bytes, max_size: int) -> Tuple[str, str, Tuple[int, int]]:
    """
    Full pipeline: validate → load → resize → base64-encode.

    Returns:
        (base64_string, mime_type, (width, height))
    """
    validate_image_bytes(data, max_size)
    img = load_image(data)
    img = resize_if_needed(img)
    b64, mime = image_to_base64(img)
    return b64, mime, img.size
