# Project Specification: iGo Vision AI (Cimas Edition)

## 1. Project Overview
A high-performance mobile health application for the **Cimas iGo Wellness Program**. 
**Goal:** Allow users to photograph meals and get instant AI-driven nutritional feedback.
**Target Stack:** Expo (React Native), NativeWind (Tailwind CSS for React Native), FastAPI (Python), and Google Gemini 1.5 Flash (Vision).

---

## 2. Branding & Design Tokens (Cimas iGo)

### Color Palette
- **Primary Color (Cimas Blue):** `#003399`
- **Secondary Color (iGo Green):** `#4CAF50`
- **Accent Color:** `#FF9800` (for Calories/Energy)

### Semantic Colors
- **Protein:** `#AF52DE` (Purple)
- **Carbs:** `#FF9500` (Orange)
- **Fat:** `#34C759` (Green)
- **Health Score:** `#007AFF` (Blue)

### Neutral Palette
- **White:** `#FFFFFF`
- **Black:** `#000000`
- **Grays:** Scale from `#FAFAFA` (gray-50) to `#1C1C1E` (gray-950)

### Design Philosophy
- **Rounded Corners:** Extensive use of rounded corners (8px to 40px, with 16-28px being most common)
- **Elevated Cards:** Heavy use of shadows and elevation for depth
- **Whitespace:** Generous padding and spacing for breathing room
- **Animations:** Smooth, spring-based animations using React Native Reanimated
- **Typography:** Plus Jakarta Sans font family with clear hierarchy
- **Medical-Grade Aesthetic:** Clean, professional, yet approachable design

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

## 4. Frontend Architecture (Expo + NativeWind)

### Tech Stack
- **Framework:** Expo SDK 54+ with Expo Router
- **Styling:** NativeWind v4 (Tailwind CSS for React Native)
- **Animations:** React Native Reanimated
- **Icons:** Ionicons (@expo/vector-icons) or Lucide React Native
- **Fonts:** Plus Jakarta Sans (via @expo-google-fonts/plus-jakarta-sans)
- **HTTP Client:** Axios
- **Image Picker:** expo-image-picker

### NativeWind Configuration

#### Tailwind Config (`tailwind.config.js`)
```javascript
{
  theme: {
    extend: {
      colors: {
        'cimas-blue': '#003399',
        'igo-green': '#4CAF50',
        'accent': '#FF9800',
        'protein': '#AF52DE',
        'carbs': '#FF9500',
        'fat': '#34C759',
        'health-score': '#007AFF',
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '32px',
        '3xl': '40px',
        'full': '9999px',
      },
      fontFamily: {
        'sans': ['PlusJakartaSans'],
      },
    },
  },
}
```

#### NativeWind Setup
- Use `NativeWindProvider` in root layout
- Configure `tailwind.config.js` with custom theme tokens
- Use `className` prop for styling (NativeWind v4 syntax)
- Support for dark mode via Tailwind's `dark:` prefix (if needed)

### Styling Patterns with NativeWind

#### Card Components
```tsx
// Example card styling
<View className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
  {/* Card content */}
</View>
```

#### Typography
```tsx
// Large titles
<Text className="text-3xl font-black text-gray-900 tracking-tight">
  Welcome to iGo
</Text>

// Section headers
<Text className="text-xl font-extrabold text-gray-900">
  Today's Routine
</Text>

// Body text
<Text className="text-sm font-medium text-gray-600">
  Description text
</Text>

// Labels
<Text className="text-xs font-bold text-gray-600 uppercase tracking-wide">
  Label
</Text>
```

#### Color Usage
- Use semantic color names: `bg-cimas-blue`, `text-igo-green`, `bg-protein`
- Use Tailwind's gray scale: `bg-gray-50` to `bg-gray-950`
- Use opacity modifiers: `bg-white/80`, `border-black/4`

#### Spacing
- Use Tailwind spacing scale: `p-4`, `p-5`, `gap-3`, `mb-5`
- Screen padding: `px-5` (20px)
- Card padding: `p-4` to `p-5` (16-20px)

#### Shadows
- Use Tailwind shadow utilities: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- For Android elevation, combine with `elevation-*` utilities if needed

#### Animations
- Use React Native Reanimated for complex animations
- Use NativeWind's transition utilities for simple animations: `transition-all duration-300`
- Spring animations via Reanimated's `withSpring`

### Screens & Components:

1. **Dashboard Screen (`screens/dashboard.tsx`):**
    - Header with user avatar, greeting, and notification bell
    - Day selector chips (horizontal scroll)
    - Hero card with gradient background, decorative blobs, and scan CTA
    - Quick glance strip (calories, streak, scans)
    - Goals chips (horizontal scroll)
    - Routine section: Hydration card and Sleep/Recovery card
    - Featured session card
    - Extra insight cards
    - AI suggested meals (horizontal scroll)

2. **Scan Screen (`screens/scan.tsx`):**
    - Header with "SCAN" label and title
    - Hero card with test scan button
    - Result card (conditional) showing:
      - Meal name and health score
      - Macro chips (Protein, Carbs, Fat)
      - iGo tip card with green background
    - Empty state when no scans
    - Suggested follow-up meals (horizontal scroll)

3. **Stats Screen (`screens/stats.tsx`):**
    - Stats hero card with weekly summary
    - At a glance section with stat rows (trend indicators)
    - AI insights rail (horizontal scroll)
    - Daily graph with calorie bars
    - Macro summary with progress bars
    - Health score card with circular progress ring

4. **Profile Screen (`screens/profile.tsx`):**
    - Profile header with avatar, name, email, badge
    - Quick stats row
    - Settings groups (Preferences, Other)
    - Sign out option

5. **Floating Dock (`components/floating-dock.tsx`):**
    - Custom bottom navigation with dark background
    - Four tabs: Home, Stats, Scan (elevated), Profile
    - Spring animations on interactions

---

## 5. Technical Implementation Notes

### Environment Variables
- Use `process.env.EXPO_PUBLIC_API_URL` for the backend URL
- Store in `.env` file (not committed to git)

### TypeScript
- Create `types/nutrition.ts` file to share types across the frontend:
  ```typescript
  export interface NutritionAnalysis {
    meal_name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    health_score: number; // 1-100
    igo_tip: string;
  }
  ```

### NativeWind Setup Steps
1. Install NativeWind v4: `npm install nativewind`
2. Install Tailwind CSS: `npm install -D tailwindcss`
3. Initialize Tailwind config: `npx tailwindcss init`
4. Configure `tailwind.config.js` with custom theme
5. Add NativeWind plugin to `babel.config.js`
6. Wrap app with `NativeWindProvider` in root layout
7. Use `className` prop for all styling

### API Service
- Create `services/mealService.ts` to handle API calls:
  - Use `FormData` for image upload
  - Use Axios for HTTP requests
  - Handle errors gracefully
  - Show loading states

### Image Handling
- Use `expo-image-picker` for camera access
- Request permissions gracefully
- Handle "No image selected" errors
- Display images with proper aspect ratio and rounded corners

### Connectivity
- Ensure backend `CORSMiddleware` allows Expo dev server (usually port 8081)
- Handle network errors with user-friendly messages
- Implement retry logic for failed requests

### Performance
- Use `expo-image` for optimized image rendering
- Implement lazy loading for horizontal scrolls
- Optimize Reanimated animations (use `runOnJS` when needed)
- Use `React.memo` for expensive components

---

## 6. Success Criteria
- The app must handle "No image selected" errors gracefully
- The UI must show a loading skeleton or spinner while the AI processes the image
- The layout must look professional and "Medical-Grade" yet accessible
- All screens must be responsive and work on various screen sizes
- Animations must be smooth and performant (60fps)
- The app must follow NativeWind/Tailwind best practices
- All brand colors and design tokens must be used consistently
- Typography hierarchy must be clear and readable