# Cimas iGO 📱

A modern, high-performance mobile dashboard application designed specifically to promote health tracking, habit building, and wellness insights. 

Built with an unapologetic "brutalist-smooth" design aesthetic heavily inspired by state-of-the-art Japanese geometry and interaction design.

---

## 🎨 Design Philosophy (Brutalist Smooth)
Cimas iGO avoids standard flat design in favor of something more tangible. Key visual landmarks include:
- **Navigation Island**: A floating, perfectly pill-shaped bottom dock anchored by a deep elevation shadow (`rgba(0,0,0,0.5)`) providing massive high-end contrast.
- **Deep Shadows**: Explicit drop shadows with color-matched tinting (Purple shadows for Hero cards, Blue for Hydration, Orange for Sleep) that make the UI pop off the device screen.
- **Chunky Typography**: Utilizes `Plus Jakarta Sans` globally with negative letter-spacing (`-1` to `-2`) to achieve a distinct, modern, and compact typeface reading experience.
- **Brand Palette**: Strong reliance on precise Hex brand tokens:
  - Deep Navy Blue (`#003399`)
  - Vibrant Yellow (`#FFD600`)
  - Deep Dark Surfaces (`#1A1A1A` and `#111111`)

## 🚀 Tech Stack
The application is purely local-first React Native functioning seamlessly through Expo.
- **Framework:** React Native + Expo SDK 54
- **Routing:** Expo Router (File-based routing)
- **Styling:** Nativewind (TailwindCSS `v3.4`) + Inline dynamic React Native stylesheets.
- **Animations:** `react-native-reanimated` (`FadeInDown` layouts, Spring animations for press-states)
- **Icons:** `@expo/vector-icons` (Ionicons) & `lucide-react-native`
- **Fonts:** `@expo-google-fonts/plus-jakarta-sans` 

## 🏗️ Technical Architecture
### App Structure
The app utilizes Expo's bleeding-edge file-based routing mechanism via the `app/` directory.
- `app/_layout.tsx`: The Root Layout. Responsible for initializing the `SafeAreaProvider`, locking the `expo-splash-screen` during font loading, and serving the `(tabs)` stack.
- `app/(tabs)/_layout.tsx`: Acts as the Global App Shell. Hides the default ugly generic tab bar and replaces it by rendering the `<FloatingDock />` concurrently *over* the router slots.
- `screens/Dashboard.tsx`: The primary complex UI view representing the `home` indexed root tab. 

### Key Mobile Components Built
✅ **Day Selector**: A dynamic, horizontally scrolling calendar window that dynamically calculates actual current dates relative to the active user session.
✅ **Hero Card Config**: Custom built absolute-positioned blur-blobs and floating geometry injected behind the "Scan Your Lunch" daily objective.
✅ **Routine Metrics**: Complex nested UI chunks dynamically rendering progress limits (Water Intake vs Sleep Quality scoring).
✅ **Elevated Scan Array**: The Navigation Island handles interaction feedback via `react-native-reanimated` spring values scaling down elements dynamically on-press.

## 📦 Local Development

### Prerequisites
Make sure `node` is installed on your machine. The project strictly utilizes `pnpm` for blazing fast deterministic caching. 

### Running The App

1. **Install Dependencies**
```bash
cd mobile
pnpm install
```

2. **Start the Metro Bundler**
Always clear the cache if you structurally modify the `app/` folder routing!
```bash
pnpm start -c 
```

3. **Open the App**
- Press `a` in the terminal to boot the Android Emulator natively.
- Press `i` to launch in the iOS Simulator.
- Press `w` to spin it up in the Web Browser.

---

*Note: Developed and polished as a high-end mobile prototype bridging dynamic UX animations with raw brutalist depth.*