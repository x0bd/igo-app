# Cimas iGo Vision AI — Backend

FastAPI-powered meal nutrition analysis using Google Gemini 1.5 Flash vision.

---

## Requirements

- Python **3.11+**
- A Google **Gemini API key** ([get one free](https://aistudio.google.com/app/apikey))

---

## Setup

```bash
# 1. Clone / navigate to the backend directory
cd backend

# 2. Create a virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment
cp .env.example .env
# Open .env and paste your GEMINI_API_KEY
```

---

## Running

```bash
# Development (auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or directly
python main.py
```

API docs available at **http://localhost:8000/docs** (development only).

---

## API Reference

### `POST /analyze`

Analyse a meal image with AI and return nutritional data.

**Request** — `multipart/form-data`

| Field   | Type   | Required | Description                          |
| ------- | ------ | -------- | ------------------------------------ |
| `image` | `file` | ✅       | JPEG, PNG, or WebP image — max 10 MB |

**Response** — `200 OK`

```json
{
	"success": true,
	"processing_time_ms": 1842,
	"model_used": "gemini-1.5-flash",
	"data": {
		"meal_name": "Grilled Chicken Salad",
		"calories": 420,
		"protein": 38,
		"carbs": 22,
		"fat": 18,
		"sat_fat": 3.2,
		"fiber": 5.1,
		"sugar": 8.0,
		"sodium": 480,
		"health_score": 87,
		"glycemic_index": "Low",
		"meal_type": "Lunch",
		"ai_confidence": 94,
		"verdict": "Excellent",
		"ingredients": [
			"Chicken breast",
			"Romaine lettuce",
			"Cherry tomatoes",
			"Cucumber",
			"Olive oil"
		],
		"ai_insights": [
			"High protein content (38g) supports muscle repair and keeps you full for 4–5 hours.",
			"Low glycemic index means steady blood sugar — ideal if you're managing energy levels.",
			"Consider adding a wholegrain roll to increase fiber and hit your daily 30g target."
		],
		"igo_tip": "Great choice! This meal aligns perfectly with the Cimas iGo protein-first principle. Pair it with 500ml of water to maximise nutrient absorption and keep your hydration streak going."
	}
}
```

**Error Responses**

| Status | `error_code`     | Cause                                       |
| ------ | ---------------- | ------------------------------------------- |
| 400    | `IMAGE_INVALID`  | File is not an image, corrupt, or too large |
| 400    | `IMAGE_REJECTED` | Gemini could not process the image          |
| 422    | `AI_PARSE_ERROR` | AI returned malformed / unvalidatable JSON  |
| 429    | _(HTTP 429)_     | Gemini API quota exceeded                   |
| 503    | _(HTTP 503)_     | Service starting up or API key missing      |

---

### `GET /health`

Readiness probe. Returns `200 ok` when service is operational.

```json
{
	"status": "ok",
	"version": "1.0.0",
	"model": "gemini-1.5-flash",
	"environment": "development"
}
```

---

### `GET /`

Root info endpoint. Lists available routes.

---

## Environment Variables

| Variable               | Default                    | Description                              |
| ---------------------- | -------------------------- | ---------------------------------------- |
| `GEMINI_API_KEY`       | _(required)_               | Google Gemini API key                    |
| `GEMINI_MODEL`         | `gemini-1.5-flash`         | Model variant to use                     |
| `HOST`                 | `0.0.0.0`                  | Bind host                                |
| `PORT`                 | `8000`                     | Bind port                                |
| `ALLOWED_ORIGINS`      | `localhost:8081,19006,...` | Comma-separated CORS origins             |
| `MAX_IMAGE_SIZE_BYTES` | `10485760` (10 MB)         | Upload size limit                        |
| `ENV`                  | `development`              | `development` enables `/docs` & `/redoc` |

---

## Project Structure

```
backend/
├── main.py                  # FastAPI app, routes, middleware
├── models.py                # Pydantic schemas (request/response)
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variable template
│
├── services/
│   ├── __init__.py
│   └── gemini_service.py    # Gemini Vision API integration
│
└── utils/
    ├── __init__.py
    └── image.py             # Image validation & processing pipeline
```

---

## Testing with curl

```bash
# Health check
curl http://localhost:8000/health

# Analyse a meal image
curl -X POST http://localhost:8000/analyze \
  -F "image=@/path/to/your/meal.jpg" \
  | python -m json.tool
```

---

## Notes

- The backend is intentionally **not connected** to the frontend during this phase.
- All image processing happens server-side (resize, EXIF correction, base64 encode).
- The Gemini prompt enforces strict JSON output — if parsing fails the endpoint returns a `422`.
- For production, set `ENV=production` to disable the Swagger UI docs.
