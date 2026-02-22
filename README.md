<div align="center">

# iGo Vision

### AI-Powered Meal Intelligence for the Cimas iGo Wellness Program

**Snap a photo. Get your full nutritional breakdown in seconds.**

_A full-stack mobile prototype built for the Cimas iGo program — because this should exist._

---

![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-E91E8C?style=for-the-badge)
![React Native](https://img.shields.io/badge/React%20Native-Expo%20SDK%2054-00BCD4?style=for-the-badge&logo=react)
![Flutter](https://img.shields.io/badge/Production%20Target-Flutter-027DFD?style=for-the-badge&logo=flutter)
![AI](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Flash-FFB300?style=for-the-badge&logo=google&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-22C55E?style=for-the-badge&logo=fastapi&logoColor=white)

</div>

---

## What is iGo Vision?

iGo Vision is a mobile wellness application concept that brings AI-powered nutritional intelligence to the Cimas iGo program. The core idea is simple: a member points their phone camera at any meal and receives an instant, comprehensive nutritional analysis — calories, macros, micronutrients, a health score, personalised AI insights, and an iGo-branded tip — all powered by Google Gemini's vision AI.

This is the prototype I designed and built to demonstrate what that experience could look and feel like for Cimas members. Every screen, animation, and data model was crafted with three things in mind: **the Cimas brand**, **real-world usability**, and **production-ready engineering**.

The project is split into two parts:

| Layer                   | Technology                 | Status                       |
| ----------------------- | -------------------------- | ---------------------------- |
| Mobile App (prototype)  | React Native + Expo        | ✅ Complete                  |
| AI Backend              | FastAPI + Gemini 1.5 Flash | ✅ Complete (standalone)     |
| Mobile App (production) | Flutter                    | 🔜 Designed to port directly |

---

## Screenshots

> _Screenshots coming soon — run the app locally to see the full experience._

---

## Feature Highlights

### 📸 Instant Meal Scanning

The centrepiece of iGo Vision. Tap the scan button, select or capture a photo of your meal, and within 2–3 seconds the AI returns a full breakdown rendered across 9 information-rich sections:

- **Food Photo Card** — identifies the dish, displays a health score ring, meal type badge, and AI confidence percentage.
- **Calorie Progress** — compares the scanned meal against a personalised daily calorie target with an animated progress bar.
- **Macro Breakdown** — protein, carbohydrate, and fat cards, each with animated progress bars tracking against that day's targets.
- **Nutrient Intel** — fibre, sugar, sodium, and saturated fat in a 2×2 grid, plus a glycaemic index (Low / Medium / High) badge.
- **Detected Ingredients** — coloured chip cloud showing every identified ingredient.
- **AI Personalised Insights** — 3 specific, data-driven observations about this exact meal, colour-coded by type.
- **iGo Verdict** — summary card in Cimas Blue with the meal's verdict (Excellent / Good / Fair / Poor), health score bar, and a branded iGo tip.
- **Follow-up Meals** — suggested companion meals to round out the day's nutrition.
- **Recent Scans History** — horizontal scroll rail of previous scans on the idle state, giving the screen life even before a scan is triggered.

### 🏠 Dashboard

A personalised home screen that surfaces what matters most at a glance:

- **Today's Food Log** — horizontal scroll of meal cards with images, health score badges, and time stamps. Running daily calorie total updated live.
- **Quick Goals Glance** — progress chips for daily targets (steps, water, protein, sleep).
- **AI Insight Cards** — rotating contextual nudges based on the member's nutrition patterns.
- **Suggested Meals** — AI-curated recommendations for upcoming meals.
- **Hero scan prompt** — always-visible call-to-action that keeps engagement with the scanning feature front and centre.

### 📊 Stats & Analytics

Weekly nutrition intelligence presented with high visual fidelity:

- **Health Score Ring** — animated SVG ring on a Cimas Yellow (#FFD600) card, scoring the week's overall nutrition quality (1–100).
- **Weekly Macro Bars** — daily protein / carb / fat breakdown across a 7-day bar chart.
- **AI Weekly Insights** — 3 analytical cards with per-card glow effects, icon squares, and coloured shadows.
- **At-a-Glance Metrics** — streak days, average calories, top macro, and best day badges.

### 👤 Profile

Member profile screen with health goals, physical stats, and iGo membership tier display.

---

## Design Language

iGo Vision uses a design philosophy I call **Brutalist Smooth** — the structural weight and high-contrast depth of brutalist design, but with polished micro-animations and premium material feel.

**Key visual principles:**

- **Floating Navigation Island** — a pill-shaped dock elevated off the screen with a deep matched shadow, replacing the standard tab bar entirely.
- **Colour-matched depth shadows** — every card casts a shadow tinted to its own dominant colour (purple hero cards, yellow health score, blue verdict card) making the UI feel physically layered.
- **Animated everything** — progress bars animate in with staggered `withDelay` + `withTiming`, cards entrance with `FadeInDown`, and interactive elements spring via `withSpring` on press.
- **Brand precision** — every colour token is exact: `#003399` Cimas Blue, `#FFD600` Cimas Yellow. No approximations.

**Typography:** Plus Jakarta Sans across all weights (`400`→`800`), with negative letter-spacing (`-0.5` to `-2`) for a compact, high-end editorial feel.

---

## Tech Stack

### Mobile (`/mobile`)

| Concern    | Choice                               | Why                                                         |
| ---------- | ------------------------------------ | ----------------------------------------------------------- |
| Framework  | React Native + Expo SDK 54           | Universal deployment (iOS, Android, Web) from one codebase  |
| Routing    | Expo Router (file-based)             | Declarative, Next.js-style routing in native apps           |
| Styling    | NativeWind v3 (TailwindCSS)          | Utility-first styling with full Tailwind intellisense       |
| Animations | react-native-reanimated              | 60fps native-thread animations; spring + timing curves      |
| Icons      | Ionicons + lucide-react-native       | Comprehensive, consistent icon coverage                     |
| Fonts      | @expo-google-fonts/plus-jakarta-sans | Global brand-consistent typography                          |
| State      | React Context API                    | Lightweight, sufficient for a prototype-scale data layer    |
| Images     | expo-image                           | Faster decoding and caching vs the built-in Image component |

### Backend (`/backend`)

| Concern          | Choice                  | Why                                                        |
| ---------------- | ----------------------- | ---------------------------------------------------------- |
| Framework        | FastAPI                 | Async Python, automatic OpenAPI docs, Pydantic-native      |
| AI Vision        | Google Gemini 1.5 Flash | Best-in-class vision + JSON reasoning at low latency       |
| Validation       | Pydantic v2             | Strict schema validation with field-level constraints      |
| Image Processing | Pillow                  | EXIF correction, resize, RGB normalisation before Gemini   |
| Config           | python-dotenv           | 12-factor app environment management                       |
| Logging          | structlog               | Structured JSON-friendly logs for production observability |
| Server           | Uvicorn + ASGI          | Production-grade async server                              |

---

## Flutter — The Production Path

This prototype was built in **React Native + Expo** for speed — it lets me ship real, animated, cross-platform UI in the shortest possible time so the concept is tangible and reviewable today.

For a production iGo Vision feature inside the Cimas ecosystem, **Flutter is the right home**. Cimas already builds in Flutter, which means:

- **Zero new toolchain debt** — the engineering team is already up and running; no ramp-up cost.
- **Direct portability** — the entire backend API (`POST /analyze`, `GET /health`) is framework-agnostic. A Flutter client consumes the exact same `AnalyzeResponse` JSON. The data models, the AI pipeline, the Gemini prompt — none of that changes.
- **Widget parity** — every screen in this prototype maps cleanly to Flutter widgets. The `AnimProgressBar` becomes an `AnimatedContainer` with a `Tween`. The `FadeInDown` entrance becomes a `FadeTransition` + `SlideTransition`. The `HealthRing` becomes a `CustomPainter` arc. One-to-one.
- **Performance ceiling** — Flutter's Skia/Impeller rendering engine gives even better animation smoothness on lower-end Android devices common in the Zimbabwean market.

**Rough Flutter migration surface:**

| React Native concept                    | Flutter equivalent                                      |
| --------------------------------------- | ------------------------------------------------------- |
| `react-native-reanimated` spring/timing | `AnimationController` + `CurvedAnimation`               |
| `NativeWind` utility classes            | `ThemeData` + custom `TextStyle`/`BoxDecoration` tokens |
| `LinearGradient` (Expo)                 | `LinearGradient` widget (built-in)                      |
| `Expo Router` file-based tabs           | `go_router` + `BottomNavigationBar`                     |
| `expo-image`                            | `cached_network_image` package                          |
| `mockMealService.ts`                    | `MealRepository` class using `http` or `dio`            |
| `AppContext` React Context              | `Provider` / `Riverpod` / `BLoC`                        |

The backend was also built with Flutter consumers in mind — the response envelope is flat, all fields are typed primitives, and the `NutritionAnalysis` schema maps directly to a Dart `fromJson` factory with no transformation needed.

---

## Architecture

```
igo-app/
│
├── mobile/                        # React Native / Expo application
│   ├── app/
│   │   ├── _layout.tsx            # Root layout — font loading, SafeAreaProvider
│   │   └── (tabs)/
│   │       ├── _layout.tsx        # App shell — renders FloatingDock over all screens
│   │       ├── index.tsx          # Dashboard tab
│   │       ├── scan.tsx           # Meal Scanner tab
│   │       ├── stats.tsx          # Weekly Stats tab
│   │       └── profile.tsx        # Profile tab
│   │
│   ├── screens/                   # Full-page screen components
│   │   ├── Dashboard.tsx          # Home — food log, goals, AI nudges
│   │   ├── Scan.tsx               # Scanner — 9-section AI result UI
│   │   ├── Stats.tsx              # Analytics — health ring, macros, insights
│   │   └── Profile.tsx            # Member profile
│   │
│   ├── components/
│   │   ├── FloatingDock.tsx       # Custom navigation island
│   │   ├── dashboard/             # Dashboard-specific sub-components
│   │   ├── decorative/            # BlurOrb, GradientBackground
│   │   └── ui/                    # Button, Card, Text, LoadingSpinner
│   │
│   ├── data/                      # Rich mock data (4 rotating scan results)
│   ├── services/                  # mockMealService — simulates AI API call
│   ├── types/                     # nutrition.ts, navigation.ts, theme.ts
│   ├── context/                   # AppContext — global state
│   └── constants/design.ts        # Brand colour tokens, spacing, typography
│
└── backend/                       # FastAPI AI backend
    ├── main.py                    # App factory, all routes, middleware
    ├── models.py                  # Pydantic schemas — NutritionAnalysis, AnalyzeResponse
    ├── services/
    │   └── gemini_service.py      # GeminiNutritionService + SYSTEM_PROMPT engineering
    └── utils/
        └── image.py               # Validate → EXIF-correct → resize → base64 pipeline
```

### How the AI pipeline works

```
[User taps Scan]
      │
      ▼
[mockMealService.ts]          ← currently returns rich mock data
      │  (future: real HTTP call to backend)
      ▼
[POST /analyze]  ─── FastAPI receives UploadFile
      │
      ├─ utils/image.py       validates MIME + size, corrects EXIF orientation,
      │                       resizes to ≤2048px, base64-encodes
      │
      ├─ services/gemini_service.py
      │       │
      │       ├─ Builds multipart prompt (SYSTEM_PROMPT + image inline data)
      │       ├─ Calls Gemini 1.5 Flash (temperature=0.2 for consistency)
      │       ├─ Strips markdown fences, extracts JSON
      │       └─ Validates against NutritionAnalysis Pydantic schema
      │
      └─ Returns AnalyzeResponse
              { success, data: NutritionAnalysis, processing_time_ms, model_used }
```

The frontend mock service is a direct structural mirror of the real `AnalyzeResponse` — swapping mock for real requires only one service file change.

---

## Running Locally

### Mobile App

**Prerequisites:** Node.js 18+, pnpm, Expo Go app (or a simulator)

```bash
cd mobile
pnpm install
pnpm start -c        # -c clears Metro cache — always use after routing changes
```

Then press `a` (Android), `i` (iOS), or `w` (Web) in the terminal.

### AI Backend

**Prerequisites:** Python 3.11+, a [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier available)

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate       # Windows
source .venv/bin/activate    # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Start the server
uvicorn main:app --reload --port 8000
```

Interactive API docs: **http://localhost:8000/docs**

```bash
# Quick test
curl -X POST http://localhost:8000/analyze \
  -F "image=@your_meal_photo.jpg" | python -m json.tool
```

---

## The iGo Vision API

The backend exposes three endpoints:

| Method | Path       | Description                                            |
| ------ | ---------- | ------------------------------------------------------ |
| `POST` | `/analyze` | Upload a meal image → returns full `NutritionAnalysis` |
| `GET`  | `/health`  | Readiness probe — confirms Gemini service is live      |
| `GET`  | `/`        | Service info                                           |

**Sample response from `POST /analyze`:**

```json
{
	"success": true,
	"processing_time_ms": 1842,
	"model_used": "gemini-1.5-flash",
	"data": {
		"meal_name": "Grilled Chicken & Quinoa Bowl",
		"calories": 487,
		"protein": 42,
		"carbs": 38,
		"fat": 14,
		"sat_fat": 2.8,
		"fiber": 6.2,
		"sugar": 4.1,
		"sodium": 390,
		"health_score": 91,
		"glycemic_index": "Low",
		"meal_type": "Lunch",
		"ai_confidence": 96,
		"verdict": "Excellent",
		"ingredients": [
			"Chicken breast",
			"Quinoa",
			"Broccoli",
			"Sweet potato",
			"Olive oil",
			"Lemon"
		],
		"ai_insights": [
			"At 42g of protein this meal covers 28% of your daily target in one sitting — ideal for post-workout recovery.",
			"The quinoa + sweet potato combination provides slow-release energy, keeping blood sugar stable for 4–5 hours.",
			"Consider adding a handful of spinach to push your iron intake — you're currently sitting at 34% of your daily goal."
		],
		"igo_tip": "Outstanding choice! This meal is a textbook example of the Cimas iGo Balance Principle — lean protein, complex carbs, and healthy fats in near-perfect ratios. Keep this streak going and you're on track for a 5-day iGo Green streak."
	}
}
```

---

## Why I Built This

The Cimas iGo program is already doing meaningful work in encouraging Zimbabweans to live healthier lives. What I wanted to demonstrate with this prototype is a concrete answer to the question: _what would it look like if iGo members had an AI nutritionist in their pocket?_

Every design decision — the colour-matched shadows, the animated macro bars, the structured Gemini prompt, the Pydantic validation layer — was made with the real product in mind. This isn't a generic health app template with Cimas colours applied. It's a ground-up exploration of what iGo Vision could be.

I built the prototype in React Native because it let me move fast and show something real. But I know Cimas builds in Flutter — and I designed everything here, from the API contract to the component boundaries, to port cleanly. The Flutter migration path is already mapped out above. I'd love the opportunity to build that version for real.

---

## About

Built by **[Your Name]** for **Cimas Health Group**, February 2026.

- **Prototype Mobile:** React Native + Expo SDK 54, NativeWind, react-native-reanimated
- **Production Target:** Flutter (architecture designed for direct portability)
- **Backend:** FastAPI, Google Gemini 1.5 Flash, Pydantic v2, Pillow, structlog
- **Design:** Brutalist Smooth — Cimas brand precision at every layer
