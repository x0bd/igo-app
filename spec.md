# Project Specification: iGo Vision AI (Cimas Edition)

## 1. Project Overview
A high-performance mobile health application for the **Cimas iGo Wellness Program**. 
**Goal:** Allow users to photograph meals and get instant AI-driven nutritional feedback.
**Target Stack:** Expo (React Native), Tamagui (UI/UX), FastAPI (Python), and Google Gemini 1.5 Flash (Vision).

---

## 2. Branding & Design Tokens (Cimas iGo)
- **Primary Color (Cimas Blue):** `#003399`
- **Secondary Color (iGo Green):** `#4CAF50`
- **Accent Color:** `#FF9800` (for Calories/Energy)
- **Design Philosophy:** Rounded corners (`$true: 16`), elevated cards, heavy use of whitespace, and "Bouncy" Tamagui animations.

---

## 3. Backend Architecture (FastAPI)
- **Location:** `/backend`
- **Files:** `main.py`, `requirements.txt`, `.env`
- **API Endpoint:** `POST /analyze`
- **Logic Flow:**
    1. Receive image as `UploadFile`.
    2. Convert bytes to PIL Image.
    3. Call `gemini-1.5-flash` with the following System Prompt:
       *"You are a nutritionist for Cimas Health Group Zimbabwe. Analyze this meal image. 
       Return ONLY raw JSON with these keys: 
       { 'meal_name': string, 'calories': int, 'protein': int, 'carbs': int, 'fat': int, 'health_score': int (1-100), 'igo_tip': string }
       Ensure the tip is encouraging and mentions Cimas iGo values."*
- **Validation:** Use Pydantic models for the response to ensure the frontend never receives malformed data.

---

## 4. Frontend Architecture (Expo + Tamagui)
- **Location:** `/mobile`
- **Key Libraries:** `tamagui`, `expo-image-picker`, `axios`, `lucide-react-native`, `expo-router`.

### Screens & Components:
1. **`index.tsx` (Dashboard):**
    - Large "Welcome to iGo" header.
    - A hero Card with a "Scan Your Meal" button.
    - An empty-state illustration or a "Recent Scans" placeholder.

2. **`CameraModule`:**
    - Trigger `ImagePicker.launchCameraAsync` with high quality.
    - Handle permissions gracefully.

3. **`ResultsScreen.tsx`:**
    - Display the captured image with a `Card` overlay.
    - **Macro Grid:** A 3-column layout using Tamagui `XStack`.
    - **Visuals:** Use Tamagui `Progress` bars for Protein, Carbs, and Fats.
    - **iGo Tip:** A "Speech Bubble" style component using the Secondary Green color.

---

## 5. Technical Implementation Notes for Cursor
- **Environment:** Use `process.env.EXPO_PUBLIC_API_URL` for the backend link.
- **Typing:** Create a `types/nutrition.ts` file to share types across the frontend.
- **Tamagui Config:** Generate a `tamagui.config.ts` that includes the Cimas Blue and iGo Green as primary/secondary themes.
- **Connectivity:** Ensure the backend `CORSMiddleware` allows the Expo dev server (usually port 8081).

---

## 6. Success Criteria
- The app must handle "No image selected" errors.
- The UI must show a loading skeleton or `Spinner` while the AI processes the image.
- The layout must look professional and "Medical-Grade" yet accessible.