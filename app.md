# Project: iGo Vision Pro (Expo + Tamagui + FastAPI)

## 1. Backend Architecture (Python FastAPI)
- **Objective:** Securely handle image processing and AI orchestration.
- **Tech:** FastAPI, Gemini-1.5-Flash, Pillow, Pydantic (for response validation).
- **Core Logic:** - Endpoint: `POST /upload`
    - Logic: Use Gemini Vision to extract nutritional data.
    - Strict Output: Return Pydantic-validated JSON (meal, calories, protein, carbs, fat, tip).

## 2. Frontend Architecture (Expo + Tamagui)
- **Objective:** High-performance, branded UI for health tracking.
- **Tech:** Expo SDK 50+, Tamagui, Lucide-Icons, Axios.
- **UI System:** - Use `TamaguiProvider` with the default config.
    - Color Palette: Primary Blue (#003399), Accent Green (#4CAF50).
    - Components: Use `YStack`, `XStack`, `Card`, `Progress`, and `H1-H4` for typography.

## 3. UI Requirements
- **Landing Screen:** A beautiful "hero" section using Tamagui `Card`. A large "Scan" button with a Lucide `Camera` icon.
- **Analysis State:** A custom Tamagui `Spinner` with a "Cimas iGo is analyzing your meal..." text.
- **Results Screen:** - An `Image` component showing the captured photo with a `borderRadius`.
    - A "Nutrition Grid" using Tamagui `XStack` and `YStack`.
    - Each macro (P, C, F) should have a `Progress` bar colored specifically (Blue for Protein, Orange for Carbs, Green for Fat).
    - A "Wellness Tip" box using a `Theme="green"` Tamagui `Frame`.

## 4. Specific Instructions for Cursor
- Initialize the Tamagui config in `tamagui.config.ts`.
- Create a `MealService.ts` to handle the `FormData` upload to the FastAPI backend.
- Ensure the app is responsive using Tamagui's media queries (e.g., `$gtSm`).
- Use `lucide-react-native` for all iconography.