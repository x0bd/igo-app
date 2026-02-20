# iGo Vision AI - Mobile UI Implementation Plan

> **Goal:** Build the complete mobile UI first (without backend integration) following the design system and inspiration provided.

## Color Scheme

- **Primary Background:** Cimas White (`#FFFFFF`)
- **Subtle Background:** Cimas Off-White (`#F8F9FA`)
- **Primary Accent:** Cimas Blue (`#003399`)
- **Complementary Accent:** Cimas Yellow (`#FFD600`)
- **Design Approach:** White background with split complementary blue and yellow accents throughout the UI

---

## Step 0: Project Setup & Dependencies

### 0.1 Install Missing Core Dependencies

- [x] Install Expo Router: `pnpm add expo-router`
- [x] Install React Navigation dependencies: `pnpm add @react-navigation/native`
- [x] Install Axios for API calls: `pnpm add axios`
- [x] Install expo-image-picker: `pnpm add expo-image-picker`
- [x] Install expo-image for optimized images: `pnpm add expo-image`
- [x] Install Plus Jakarta Sans font: `pnpm add @expo-google-fonts/plus-jakarta-sans`
- [x] Install expo-font for font loading: `pnpm add expo-font`
- [x] Install Lucide React Native for icons: `pnpm add lucide-react-native` (or keep Ionicons)
- [x] Install expo-linear-gradient for gradients: `pnpm add expo-linear-gradient`
- [x] Install react-native-svg for custom graphics: `pnpm add react-native-svg`

### 0.2 Update Tailwind Configuration

- [x] Update `tailwind.config.js` with custom theme from spec:
  - [x] Add Cimas brand colors:
    - [x] `cimas-blue`: `#003399` (Primary accent)
    - [x] `cimas-yellow`: `#FFD600` (Complementary accent)
    - [x] `cimas-white`: `#FFFFFF` (Primary background)
    - [x] `cimas-off-white`: `#F8F9FA` (Subtle background variant)
  - [x] Add semantic colors (protein, carbs, fat, health-score)
  - [x] Add custom border radius scale (xs: 8px → 3xl: 40px)
  - [x] Configure Plus Jakarta Sans font family
  - [x] Update content paths to include all source files

### 0.3 Configure Expo Router

- [x] Create `app/` directory structure
- [x] Set up `app/_layout.tsx` as root layout
- [x] Configure NativeWindProvider in root layout
- [x] Set up font loading in root layout
- [x] Create `app/(tabs)/` directory for tab navigation
- [x] Configure `app/(tabs)/_layout.tsx` (hidden tabs, custom dock)
- [x] Create placeholder route files: `index.tsx`, `scan.tsx`, `stats.tsx`, `profile.tsx`

### 0.4 Environment Setup

- [x] Create `.env` file in mobile directory
- [x] Add `EXPO_PUBLIC_API_URL` placeholder (for future backend integration)
- [x] Add `.env` to `.gitignore`
- [x] Create `.env.example` with template

### 0.5 TypeScript Types Setup

- [x] Create `types/` directory
- [x] Create `types/nutrition.ts` with `NutritionAnalysis` interface
- [x] Create `types/navigation.ts` for navigation types
- [x] Create `types/theme.ts` for theme-related types
- [x] Update `tsconfig.json` paths if needed

---

## Step 1: Design System & Style Understanding

### 1.1 Analyze Design Inspiration (`inspo/smooth.js`)

- [x] Study depth shadow patterns (adapted for Cimas blue/yellow):
  - [x] Cimas Blue depth shadow: `0 20px 40px -10px rgba(0, 51, 153, 0.4), 0 10px 20px -5px rgba(0, 51, 153, 0.2), inset 0 2px 4px rgba(255,255,255,0.3)`
  - [x] Cimas Yellow depth shadow: `0 20px 40px -10px rgba(255, 214, 0, 0.4), 0 10px 20px -5px rgba(255, 214, 0, 0.2), inset 0 2px 4px rgba(255,255,255,0.3)`
  - [x] Blue-Yellow gradient shadow: Combined blue and yellow shadows for split complementary accents
  - [x] Navigation island shadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)`
  - [x] White card shadow: `0 10px 30px -5px rgba(0, 0, 0, 0.05)` (subtle for white background)
- [x] Study decorative elements:
  - [x] Blur orbs/glows using absolute positioning
  - [x] Gradient backgrounds with multiple color stops
  - [x] Overlapping decorative shapes (circles, rounded squares)
- [x] Study typography:
  - [x] Tight letter spacing: `-0.04em` for large headings
  - [x] Font weights: 400, 500, 600, 700, 800, 900
  - [x] Plus Jakarta Sans font family
- [x] Study card patterns:
  - [x] Super cards with `borderRadius: 2.5rem` (40px)
  - [x] White cards with subtle borders (`border-gray-100`)
  - [x] Colored cards with depth shadows
  - [x] Active state transforms: `scale(0.96)` on press

### 1.2 Create Design Tokens File

- [x] Create `constants/design.ts`:
  - [x] Export color palette:
    - [x] Cimas Blue: `#003399`
    - [x] Cimas Yellow: `#FFD600`
    - [x] Cimas White: `#FFFFFF`
    - [x] Cimas Off-White: `#F8F9FA`
  - [x] Export shadow presets (depthShadowBlue, depthShadowYellow, navIslandShadow, whiteCardShadow)
  - [x] Export spacing scale
  - [x] Export typography scale (font sizes, weights, letter spacing)
  - [x] Export transition timings (cubic-bezier curves)
  - [x] Export blur values for decorative elements

### 1.3 Create Reusable Style Utilities

- [x] Create `utils/styles.ts`:
  - [x] Helper function for depth shadows (accepts color)
  - [x] Helper function for decorative blur orbs
  - [x] Helper function for tight text spacing
  - [x] Helper function for super card styles
  - [x] Helper function for active press transforms

### 1.4 Update Global Styles

- [x] Update `global.css`:
  - [x] Add custom CSS variables if needed
  - [x] Add utility classes for tight text
  - [x] Add utility classes for scrollbar hiding
  - [x] Add any custom animations

---

## Step 2: Core Components Foundation

### 2.1 Create Base Components

- [x] Create `components/ui/Card.tsx`:
  - [x] Base card component with variants:
    - [x] White card (default, `#FFFFFF`)
    - [x] Blue accent card (Cimas Blue background or border)
    - [x] Yellow accent card (Cimas Yellow background or border)
    - [x] Blue-yellow gradient card (split complementary)
  - [x] Support for depth shadows
  - [x] Support for decorative elements
  - [x] Rounded corners (configurable)
  - [x] Press animations with Reanimated
- [x] Create `components/ui/Text.tsx`:
  - [x] Typography component with variants (heading, body, label, caption)
  - [x] Support for tight letter spacing
  - [x] Font weight presets
  - [x] Color variants (dark gray on white background)
- [x] Create `components/ui/Button.tsx`:
  - [x] Primary button variant (Cimas Blue background with yellow accent)
  - [x] Secondary button variant (white with blue border)
  - [x] Accent button variant (Cimas Yellow)
  - [x] Ghost/outline variant
  - [x] Press animations (scale down)
  - [x] Loading state support
  - [x] Icon support

### 2.2 Create Decorative Components

- [x] Create `components/decorative/BlurOrb.tsx`:
  - [x] Configurable size, color, position
  - [x] Blur effect using absolute positioning
  - [x] Opacity controls
- [x] Create `components/decorative/GradientBackground.tsx`:
  - [x] Multi-color gradient support
  - [x] Directional gradients
  - [x] Overlay support

### 2.3 Create Navigation Component

- [x] Create `components/navigation/FloatingDock.tsx`:
  - [x] Dark background (`#050607` or `#111111`)
  - [x] Rounded pill shape (40px radius)
  - [x] Fixed bottom positioning with safe area
  - [x] Navigation island shadow
  - [x] Four tabs: Home, Stats, Scan (elevated), Profile
  - [x] Elevated scan button (white pill, 70x70px)
  - [x] Spring animations on press
  - [x] Active state indicators
  - [ ] Integration with Expo Router navigation

---

## Step 3: Dashboard Screen Implementation

### 3.1 Dashboard Layout Structure

- [x] Create `screens/dashboard.tsx`
- [x] Set up ScrollView with proper padding
- [x] Configure background color (`#FFFFFF` - Cimas White)
- [x] Add bottom padding for floating dock clearance (130-140px)

### 3.2 Header Section

- [x] Create header component:
  - [x] User avatar with gradient ring border
  - [x] Greeting text ("Good morning/afternoon/evening")
  - [x] User name display
  - [x] Notification bell icon button
  - [x] Proper spacing and alignment

### 3.3 Day Selector Component

- [x] Create `components/dashboard/DaySelector.tsx`:
  - [x] Horizontal ScrollView
  - [x] Day cards (Mon-Fri) with dates
  - [x] Active day styling (dark background or Cimas Blue background, scale transform)
  - [x] Blue or yellow dot indicator for active day
  - [x] Smooth transitions on day change
  - [x] Mock data for days/dates

### 3.4 Hero Card Component

- [x] Create `components/dashboard/HeroCard.tsx`:
  - [x] White background with blue-yellow split complementary accents
  - [x] Blue gradient accent (left side, `#003399`)
  - [x] Yellow gradient accent (right side, `#FFD600`)
  - [x] Decorative blur orbs (blue orb top-left, yellow orb bottom-right)
  - [x] Decorative shapes (yellow circle accent, blue rounded square accent)
  - [x] "TODAY'S FOCUS" or "DAILY GOAL" pill badge (white with blue/yellow border)
  - [x] Large title text (tight spacing, dark gray on white)
  - [x] Subtitle text
  - [x] Avatar row showing user + others ("+8k" indicator)
  - [x] Depth shadow (blue-yellow combined or subtle white card shadow)
  - [x] Proper z-index layering

### 3.5 Quick Glance Strip

- [x] Create `components/dashboard/QuickGlance.tsx`:
  - [x] Three pill cards in horizontal row:
    - [x] Today's calories (dark background or Cimas Blue)
    - [x] Streak counter with flame icon (dark background or Cimas Yellow)
    - [x] Scans count (white with blue/yellow accent border)
  - [x] Icon + value + label layout
  - [x] Mock data for values

### 3.6 Goals Chips

- [x] Create `components/dashboard/GoalsChips.tsx`:
  - [x] Horizontal ScrollView
  - [x] Colored chips (Cimas Blue, deep blue, Cimas Yellow) with matching depth shadows
  - [x] Icon circle with semi-transparent background
  - [x] Goal labels (uppercase, subdued) and large value text
  - [x] Mock goal data
  - [x] **Styling refactor:** Removed broken `Card` abstraction — plain `TouchableOpacity` with direct inline styles

### 3.7 Routine Section

- [x] Create `components/dashboard/RoutineSection.tsx`:
  - [x] Two-column grid layout
  - [x] **Hydration Card:**
    - [x] Cimas Blue background (`#003399`) or white with blue accent border
    - [x] Water icon in white/transparent pill
    - [x] "Water Intake" title
    - [x] Progress gauge (rounded bar, blue accent)
    - [x] Percentage display
    - [x] Depth shadow (blue)
    - [x] Decorative blur orb (blue)
  - [x] **Sleep/Recovery Card:**
    - [x] Cimas Yellow background (`#FFD600`) or white with yellow accent border
    - [x] Moon icon
    - [x] "Sleep Cycle" title
    - [x] Hours display (large number)
    - [x] Quality rating with icon
    - [x] Depth shadow (yellow)
    - [x] Decorative blur orb (yellow)
  - [x] Mock data for hydration and sleep

### 3.8 Featured Session Card

- [x] Create `components/dashboard/FeaturedSession.tsx`:
  - [x] White card with border
  - [x] Thumbnail image placeholder
  - [x] Title ("Evening Wind Down")
  - [x] Trainer info
  - [x] Tag badges (duration, type)
  - [x] Proper spacing and layout

### 3.9 Extra Insight Cards

- [x] Create `components/dashboard/InsightCards.tsx`:
  - [x] Dark card (`#111111`) — Breakfast Recap with restaurant icon, metric pill (42g Protein)
  - [x] White card — Tomorrow's Prep with calendar icon and chevron badge
  - [x] Label badge pills, icon containers with rounded corners
  - [x] **Styling refactor:** Removed broken `Card` abstraction — plain `TouchableOpacity` with direct inline styles

### 3.10 AI Suggested Meals

- [x] Create `components/dashboard/SuggestedMeals.tsx`:
  - [x] Horizontal ScrollView
  - [x] Dark cards with colored accent dots
  - [x] Meal title and subtitle
  - [x] Kcal display
  - [x] Tag badges
  - [x] Mock meal data

### 3.11 Dashboard Animations

- [x] Add entrance animations:
  - [x] FadeInDown for header (delay: 0ms)
  - [x] FadeInDown for day selector (delay: 80ms)
  - [x] FadeInDown for hero card (delay: 150ms)
  - [x] Staggered delays for other sections
- [x] Add press animations for interactive elements
- [x] Ensure smooth 60fps performance

---

## Step 4: Scan Screen Implementation

### 4.1 Scan Screen Layout

- [x] Create `screens/Scan.tsx`
- [x] Set up ScrollView with proper padding
- [x] Configure background color (`#F8F9FC` - Cimas Off-White)
- [x] Add bottom padding for floating dock (140px)

### 4.2 Scan Header

- [x] Create header:
  - [x] "SCAN" label (uppercase, small, gray, letterSpacing 2)
  - [x] "Meal Analysis" title (34px, weight 900, letterSpacing -1.5)
  - [x] Proper spacing

### 4.3 Hero Scan Card

- [x] Built inline in `screens/Scan.tsx` (no separate component file needed):
  - [x] Cimas Blue `#003399` background with blue depth shadow
  - [x] Yellow glow blob top-right, blue glow blob bottom-left
  - [x] Decorative yellow circle + rotated blue square top-right
  - [x] "AI POWERED" frosted pill badge
  - [x] "Scan your Meal" title (42px, weight 900, letterSpacing -2)
  - [x] Subtitle text
  - [x] White pill CTA button with camera icon + yellow arrow-badge accent
  - [x] Spring press animation on CTA button
  - [x] Button transitions to "Analysing..." + ActivityIndicator during loading

### 4.4 Result Card Component

- [x] Built inline in `screens/Scan.tsx`:
  - [x] Conditional rendering (only shown in `result` state)
  - [x] White card with subtle border
  - [x] Meal name + dynamic health score badge (green/amber/red by score)
  - [x] Dark `#111111` calories strip with flame icon + large kcal value
  - [x] Three macro chips: Protein (purple), Carbs (orange), Fat (green)
  - [x] iGo Tip card with leaf icon, blue border, yellow dot accent
  - [x] Mock `NutritionAnalysis` result data

### 4.5 Empty State Component

- [x] Built inline in `screens/Scan.tsx`:
  - [x] Centered white card with rounded corners
  - [x] `image-outline` icon in blue-tinted square
  - [x] "No scans yet" title + helper subtitle
  - [x] Three hint chips (Instant results, AI-powered, Cimas iGo)
  - [x] Shown only in `idle` state

### 4.6 Suggested Follow-up Meals

- [x] Built inline in `screens/Scan.tsx`:
  - [x] Horizontal ScrollView with section header + "See all"
  - [x] Dark photo cards (200×240px, borderRadius 28) with image overlay
  - [x] Yellow accent dot, kcal badge, tag badge per card
  - [x] Shown only in `result` state
  - [x] Mock meal data (3 items)

### 4.7 Scan Screen State Management

- [x] Three-state machine: `idle → loading → result` via `useState<ScanState>`
- [x] Mock `handleScan()` simulates 2.4s API delay then sets mock result
- [x] `handleReset()` resets back to `idle`
- [x] Loading state renders spinner card instead of empty state
- [x] `app/(tabs)/scan.tsx` updated to render `<Scan />`

### 4.8 Scan Screen Animations

- [x] `FadeInDown` entrance for header, hero card, empty state (staggered delays)
- [x] `FadeIn` for loading card
- [x] `FadeInDown` staggered for results header, result card, tip card, meals section
- [x] `withSpring` scale animation on CTA button press
- [x] Per-card `FadeInDown` on suggested meal items

---

## Step 5: Stats Screen Implementation

### 5.1 Stats Screen Layout

- [x] Create `screens/Stats.tsx`
- [x] Set up ScrollView with proper padding
- [x] Configure background color (`#F8F9FC` - Cimas Off-White)
- [x] Add bottom padding for floating dock (140px)
- [x] `app/(tabs)/stats.tsx` wired to `screens/Stats.tsx`

### 5.2 Stats Header

- [x] Create header:
  - [x] "THIS WEEK" label (uppercase, 10px, letterSpacing 2)
  - [x] "Statistics" title (34px, weight 900, letterSpacing -1.5)
  - [x] Proper spacing

### 5.3 Stats Hero Card

- [x] Built inline in `screens/Stats.tsx`:
  - [x] Cimas Blue `#003399` background with blue depth shadow
  - [x] Yellow + blue decorative glow blobs
  - [x] Decorative yellow circle + rotated dark square (inspo pattern)
  - [x] "WEEKLY REPORT" frosted pill badge
  - [x] "Strong Progress" title (38px, weight 900)
  - [x] Subtitle with weekly performance note
  - [x] Metrics row: Avg kcal · Best Score · Consistency (frosted glass tiles)

### 5.4 At a Glance Section

- [x] Built inline in `screens/Stats.tsx`:
  - [x] White card with divider rows
  - [x] Four rows: Avg Calories · Avg Protein · Avg Carbs · Avg Health Score
  - [x] Each row: colored icon square + label/value + trend badge (green ↑ / red ↓)
  - [x] Trend badges use `trending-up` / `trending-down` Ionicons

### 5.5 AI Insights Rail

- [x] Built inline in `screens/Stats.tsx`:
  - [x] Horizontal ScrollView with section header + "See all"
  - [x] Dark `#111111` cards (230px wide, borderRadius 28)
  - [x] Colored accent dot (blue, yellow, purple) per card
  - [x] Insight title + body text
  - [x] Staggered FadeInDown entrance per card

### 5.6 Daily Graph Component

- [x] Built as `<BarChart />` sub-component in `screens/Stats.tsx`:
  - [x] Custom SVG bar chart using `react-native-svg` (already installed)
  - [x] 6 time slots (6a, 9a, 12p, 3p, 6p, 9p)
  - [x] SVG LinearGradient fills: purple (protein-rich), orange (carb-heavy), slate (light)
  - [x] Round-top bars (`rx = barWidth/2`)
  - [x] SVG time labels below bars
  - [x] Current/target kcal badge in card header
  - [x] Color key legend (protein · carbs · light)
  - [x] Chart note: victory-native v41 required Skia/canvaskit → switched to react-native-svg custom chart for full design control

### 5.7 Macro Summary Component

- [x] Built as `<MacroBar />` per-item component:
  - [x] White card with three animated progress bars
  - [x] Protein (purple `#AF52DE`), Carbs (orange `#FF9500`), Fat (green `#34C759`)
  - [x] Each bar: label + current/target values + Reanimated width animation
  - [x] `withDelay` + `withSpring` staggered entrance per bar
  - [x] Percentage text below each bar

### 5.8 Health Score Card

- [x] Built as `<HealthRing />` sub-component:
  - [x] Dark `#111111` card with blue/yellow blob accents (inspo depth pattern)
  - [x] SVG circular progress ring (Circle + strokeDasharray/offset)
  - [x] Ring color adaptive: green ≥80 / amber ≥60 / red <60
  - [x] Score centered inside ring (32px, weight 900)
  - [x] Left pane: label pill + title + description + tag badges
  - [x] `withDelay` + `withTiming` (1200ms) animated ring on mount

### 5.9 Stats Screen Animations

- [x] `FadeInDown` staggered entrance for every section (0 → 340ms delays)
- [x] `withSpring` + `withDelay` per bar in BarChart
- [x] `withSpring` + `withDelay` per MacroBar progress fill
- [x] `withTiming` (1200ms) for health score ring draw animation

---

## Step 6: Profile Screen Implementation

### 6.1 Profile Screen Layout

- [ ] Create `screens/profile.tsx`
- [ ] Set up ScrollView with proper padding
- [ ] Configure background color (`#FFFFFF` - Cimas White)
- [ ] Add bottom padding for floating dock

### 6.2 Profile Header

- [ ] Create header:
  - [ ] "ACCOUNT" label (uppercase, small)
  - [ ] "Profile" title
  - [ ] Proper spacing

### 6.3 Profile Header Section

- [ ] Create `components/profile/ProfileHeader.tsx`:
  - [ ] Large circular avatar (80px) with initials
  - [ ] User name (large, bold)
  - [ ] Email address
  - [ ] Premium member badge with ribbon icon
  - [ ] Mock user data

### 6.4 Quick Stats Row

- [ ] Create `components/profile/QuickStats.tsx`:
  - [ ] Three-column white card
  - [ ] Stats:
    - [ ] Meals Scanned
    - [ ] Day Streak
    - [ ] Avg Score
  - [ ] Vertical dividers between stats
  - [ ] Mock stats data

### 6.5 Settings Groups

- [ ] Create `components/profile/SettingsList.tsx`:
  - [ ] **PREFERENCES group:**
    - [ ] Daily Goals (with subtitle, chevron)
    - [ ] Notifications (with subtitle, chevron)
    - [ ] Appearance (with subtitle, chevron)
  - [ ] **OTHER group:**
    - [ ] Cimas Health Connect (with chevron)
    - [ ] Privacy & Data (with chevron)
    - [ ] Help & Support (with chevron)
  - [ ] **Sign Out** (destructive, red, no chevron)
  - [ ] Icon + label + chevron pattern
  - [ ] Press animations
  - [ ] Mock navigation handlers

### 6.6 Profile Footer

- [ ] Create `components/profile/ProfileFooter.tsx`:
  - [ ] App version display
  - [ ] "Powered by Cimas Health Group" text
  - [ ] Subtle styling

### 6.7 Profile Screen Animations

- [ ] Add entrance animations
- [ ] Add press animations for settings items
- [ ] Smooth transitions

---

## Step 7: Navigation & Routing Integration

### 7.1 Expo Router Setup

- [x] Configure `app/_layout.tsx`:
  - [x] NativeWindProvider wrapper
  - [x] Font loading (Plus Jakarta Sans)
  - [x] SafeAreaProvider
  - [x] StatusBar configuration
  - [x] Root navigation structure

### 7.2 Tab Layout Configuration

- [x] Configure `app/(tabs)/_layout.tsx`:
  - [x] Hide default tab bar
  - [x] Set up screen routes
  - [x] Configure navigation options

### 7.3 Screen Routes

- [x] Create `app/(tabs)/index.tsx` → Dashboard screen
- [x] Create `app/(tabs)/scan.tsx` → Scan screen (wired to `screens/Scan.tsx`)
- [x] Create `app/(tabs)/stats.tsx` → Stats screen (wired to `screens/Stats.tsx`)
- [ ] Create `app/(tabs)/profile.tsx` → Profile screen (placeholder, pending Step 6)

### 7.4 Floating Dock Integration

- [x] Integrate FloatingDock with Expo Router:
  - [x] Use `useRouter()` and `usePathname()` hooks (removed prop-based `onNavigate`)
  - [x] `router.push(ROUTES[id])` on every tab press
  - [x] Active state driven by `pathnameToId(usePathname())` — highlights correct tab on each screen
  - [x] Scan button navigates to `/scan`; turns Cimas Blue when active
  - [x] Each button has its own `useSharedValue` (fixed shared-scale bug)
  - [x] `onPressIn` / `onPressOut` replaces setTimeout pattern for snappier feel

### 7.5 Navigation State Management

- [ ] Ensure proper navigation state
- [ ] Handle deep linking (if needed)
- [ ] Handle back button behavior

---

## Step 8: Mock Data & State Management

### 8.1 Create Mock Data Files

- [ ] Create `data/mockUser.ts`:
  - [ ] User profile data
  - [ ] Avatar, name, email
  - [ ] Premium status
- [ ] Create `data/mockNutrition.ts`:
  - [ ] Mock scan results
  - [ ] Mock daily nutrition data
  - [ ] Mock weekly stats
- [ ] Create `data/mockMeals.ts`:
  - [ ] Suggested meals
  - [ ] Meal details
- [ ] Create `data/mockGoals.ts`:
  - [ ] Daily goals
  - [ ] Target values

### 8.2 State Management Setup

- [ ] Decide on state management approach:
  - [ ] React Context API for global state
  - [ ] Or simple useState for now (can upgrade later)
- [ ] Create `context/AppContext.tsx` (if using Context):
  - [ ] User state
  - [ ] Scan results state
  - [ ] Nutrition data state
  - [ ] Goals state

### 8.3 Mock API Service

- [ ] Create `services/mockMealService.ts`:
  - [ ] Mock `analyzeMeal()` function
  - [ ] Simulate API delay (setTimeout)
  - [ ] Return mock NutritionAnalysis data
  - [ ] Handle loading states
  - [ ] Handle error states

---

## Step 9: Animations & Interactions

### 9.1 Entrance Animations

- [ ] Review all screens for entrance animations:
  - [ ] Dashboard: Staggered FadeInDown
  - [ ] Scan: FadeIn for cards
  - [ ] Stats: Staggered FadeInDown
  - [ ] Profile: FadeInDown
- [ ] Ensure consistent timing (400-600ms duration)
- [ ] Use appropriate delays for staggered effects

### 9.2 Press Animations

- [ ] Add press animations to all interactive elements:
  - [ ] Buttons: scale(0.88-0.96)
  - [ ] Cards: scale(0.96)
  - [ ] Navigation tabs: scale(0.85)
- [ ] Use Reanimated's `withSpring` for natural motion
- [ ] Configure proper damping and stiffness

### 9.3 Loading States

- [ ] Create `components/ui/LoadingSpinner.tsx`:
  - [ ] Animated spinner
  - [ ] Configurable size and color
- [ ] Add loading states to scan screen
- [ ] Add skeleton loaders if needed

### 9.4 Transition Animations

- [ ] Add screen transition animations
- [ ] Add card slide-in animations
- [ ] Add progress bar animations
- [ ] Ensure 60fps performance

---

## Step 10: Polish & Refinement

### 10.1 Typography Consistency

- [ ] Review all text for proper typography:
  - [x] Large titles: 28-32px, weight 900, tight spacing (GoalsChips values, InsightCards titles)
  - [x] Section titles: 18-20px, weight 800 (InsightCards card titles)
  - [ ] Body text: 12-14px, weight 500-600
  - [x] Labels: 10-12px, weight 700, uppercase (GoalsChips label, InsightCards badge text)
- [ ] Ensure Plus Jakarta Sans is loaded everywhere
- [ ] Verify letter spacing for large headings

### 10.2 Color Consistency

- [ ] Verify all brand colors match new scheme:
  - [ ] Cimas Blue: `#003399` (Primary accent)
  - [ ] Cimas Yellow: `#FFD600` (Complementary accent)
  - [ ] Cimas White: `#FFFFFF` (Primary background)
  - [ ] Cimas Off-White: `#F8F9FA` (Subtle background variant)
  - [ ] Semantic colors (protein, carbs, fat, health-score)
- [ ] Ensure white background is used consistently across all screens
- [ ] Verify blue and yellow accents are used as split complementary colors
- [ ] Check gray scale usage for text and subtle elements
- [ ] Verify opacity modifiers for overlays and decorative elements

### 10.3 Spacing Consistency

- [ ] Review all spacing:
  - [ ] Screen padding: 20px horizontal
  - [ ] Card gaps: 10-18px
  - [ ] Section spacing: 20-32px
  - [ ] Bottom padding: 130-140px (for dock)
- [ ] Ensure consistent use of Tailwind spacing scale

### 10.4 Shadow & Depth

- [ ] Verify depth shadows match new color scheme:
  - [x] Blue accent cards use depthShadowBlue (GoalsChips Cimas Blue + deep blue chips)
  - [x] Yellow accent cards use depthShadowYellow (GoalsChips yellow chip, shadow `#C8A800`)
  - [x] White cards use subtle whiteCardShadow (InsightCards white card)
  - [ ] Navigation uses navIslandShadow
  - [ ] Cards with blue-yellow accents use combined shadow
- [ ] Check all cards have appropriate shadows
- [ ] Verify elevation on Android
- [ ] Ensure shadows work well on white background

### 10.5 Border Radius Consistency

- [ ] Verify border radius usage:
  - [ ] Super cards: 40px (3xl)
  - [ ] Regular cards: 20-28px (lg-xl)
  - [ ] Pills: full (9999px)
  - [ ] Small elements: 8-16px (xs-md)
- [ ] Ensure consistent rounding

### 10.6 Responsive Design

- [ ] Test on different screen sizes (if possible)
- [ ] Ensure horizontal ScrollViews work properly
- [ ] Verify cards don't overflow
- [ ] Check text wrapping

### 10.7 Accessibility

- [ ] Add accessibility labels to interactive elements
- [ ] Ensure proper contrast ratios
- [ ] Test with screen readers (if available)
- [ ] Add proper semantic roles

### 10.8 Performance Optimization

- [ ] Use `React.memo` for expensive components
- [ ] Optimize Reanimated animations
- [ ] Use `expo-image` for all images
- [ ] Implement lazy loading for horizontal scrolls
- [ ] Check for unnecessary re-renders

---

## Step 11: Testing & Validation

### 11.1 Visual Testing

- [ ] Compare each screen with design inspiration
- [ ] Verify all components match spec
- [ ] Check spacing and alignment
- [ ] Verify colors match design tokens
- [ ] Test animations and transitions

### 11.2 Interaction Testing

- [ ] Test all navigation flows
- [ ] Test all button presses
- [ ] Test all scrollable sections
- [ ] Test state changes (scan results, etc.)
- [ ] Test loading states
- [ ] Test error states

### 11.3 Edge Cases

- [ ] Test empty states
- [ ] Test with long text (meal names, tips)
- [ ] Test with very large numbers
- [ ] Test navigation edge cases
- [ ] Test animation edge cases

### 11.4 Code Quality

- [ ] Run ESLint and fix all errors
- [ ] Run Prettier and format all files
- [ ] Check TypeScript errors
- [ ] Review component structure
- [ ] Ensure consistent code style

---

## Step 12: Documentation & Cleanup

### 12.1 Code Documentation

- [ ] Add JSDoc comments to complex components
- [ ] Document prop interfaces
- [ ] Document utility functions
- [ ] Add inline comments for complex logic

### 12.2 File Organization

- [ ] Ensure proper file structure
- [ ] Remove unused files
- [ ] Remove console.logs
- [ ] Clean up commented code

### 12.3 README Updates

- [ ] Update mobile README with:
  - [ ] Setup instructions
  - [ ] Project structure
  - [ ] Design system overview
  - [ ] Component usage examples
  - [ ] Development workflow

### 12.4 Final Checklist

- [ ] All screens implemented
- [ ] All components working
- [ ] All animations smooth
- [ ] All mock data in place
- [ ] Navigation working
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Code formatted and linted
- [ ] Ready for backend integration

---

## Notes

- **Design Inspiration:** The `inspo/smooth.js` file provides the visual style guide with depth shadows, decorative elements, and smooth animations.
- **Backend Integration:** This plan focuses on UI only. Backend integration will be handled separately.
- **Mock Data:** All data is mocked for now. Replace with real API calls when backend is ready.
- **Performance:** Keep animations at 60fps. Use React.memo and optimize Reanimated usage.
- **Accessibility:** Ensure proper labels and contrast ratios throughout.

---

**Status:** Ready to begin implementation 🚀
