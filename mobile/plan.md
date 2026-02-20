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
- [x] Install Expo Router: `pnpm add expo-router` ✅
- [x] Install React Navigation dependencies: `pnpm add @react-navigation/native` ✅
- [x] Install Axios for API calls: `pnpm add axios` ✅
- [x] Install expo-image-picker: `pnpm add expo-image-picker` ✅
- [x] Install expo-image for optimized images: `pnpm add expo-image` ✅
- [x] Install Plus Jakarta Sans font: `pnpm add @expo-google-fonts/plus-jakarta-sans` ✅
- [x] Install expo-font for font loading: `pnpm add expo-font` ✅
- [x] Install Lucide React Native for icons: `pnpm add lucide-react-native` ✅
- [x] Install expo-linear-gradient for gradients: `pnpm add expo-linear-gradient` ✅
- [x] Install react-native-svg for custom graphics: `pnpm add react-native-svg` ✅

### 0.2 Update Tailwind Configuration
- [x] Update `tailwind.config.js` with custom theme from spec: ✅
  - [x] Add Cimas brand colors:
    - [x] `cimas-blue`: `#003399` (Primary accent) ✅
    - [x] `cimas-yellow`: `#FFD600` (Complementary accent) ✅
    - [x] `cimas-white`: `#FFFFFF` (Primary background) ✅
    - [x] `cimas-off-white`: `#F8F9FA` (Subtle background variant) ✅
  - [x] Add semantic colors (protein, carbs, fat, health-score) ✅
  - [x] Add custom border radius scale (xs: 8px → 3xl: 40px) ✅
  - [x] Configure Plus Jakarta Sans font family ✅
  - [x] Update content paths to include all source files ✅

### 0.3 Configure Expo Router
- [x] Create `app/` directory structure ✅
- [x] Set up `app/_layout.tsx` as root layout ✅
- [x] Configure NativeWindProvider in root layout ✅
- [x] Set up font loading in root layout ✅
- [x] Create `app/(tabs)/` directory for tab navigation ✅
- [x] Configure `app/(tabs)/_layout.tsx` (hidden tabs, custom dock) ✅
- [x] Create placeholder route files: `index.tsx`, `scan.tsx`, `stats.tsx`, `profile.tsx` ✅

### 0.4 Environment Setup
- [ ] Create `.env` file in mobile directory
- [ ] Add `EXPO_PUBLIC_API_URL` placeholder (for future backend integration)
- [ ] Add `.env` to `.gitignore`
- [ ] Create `.env.example` with template

### 0.5 TypeScript Types Setup
- [ ] Create `types/` directory
- [ ] Create `types/nutrition.ts` with `NutritionAnalysis` interface
- [ ] Create `types/navigation.ts` for navigation types
- [ ] Create `types/theme.ts` for theme-related types
- [ ] Update `tsconfig.json` paths if needed

---

## Step 1: Design System & Style Understanding

### 1.1 Analyze Design Inspiration (`inspo/smooth.js`)
- [ ] Study depth shadow patterns (adapted for Cimas blue/yellow):
  - [ ] Cimas Blue depth shadow: `0 20px 40px -10px rgba(0, 51, 153, 0.4), 0 10px 20px -5px rgba(0, 51, 153, 0.2), inset 0 2px 4px rgba(255,255,255,0.3)`
  - [ ] Cimas Yellow depth shadow: `0 20px 40px -10px rgba(255, 214, 0, 0.4), 0 10px 20px -5px rgba(255, 214, 0, 0.2), inset 0 2px 4px rgba(255,255,255,0.3)`
  - [ ] Blue-Yellow gradient shadow: Combined blue and yellow shadows for split complementary accents
  - [ ] Navigation island shadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)`
  - [ ] White card shadow: `0 10px 30px -5px rgba(0, 0, 0, 0.05)` (subtle for white background)
- [ ] Study decorative elements:
  - [ ] Blur orbs/glows using absolute positioning
  - [ ] Gradient backgrounds with multiple color stops
  - [ ] Overlapping decorative shapes (circles, rounded squares)
- [ ] Study typography:
  - [ ] Tight letter spacing: `-0.04em` for large headings
  - [ ] Font weights: 400, 500, 600, 700, 800, 900
  - [ ] Plus Jakarta Sans font family
- [ ] Study card patterns:
  - [ ] Super cards with `borderRadius: 2.5rem` (40px)
  - [ ] White cards with subtle borders (`border-gray-100`)
  - [ ] Colored cards with depth shadows
  - [ ] Active state transforms: `scale(0.96)` on press

### 1.2 Create Design Tokens File
- [ ] Create `constants/design.ts`:
  - [ ] Export color palette:
    - [ ] Cimas Blue: `#003399`
    - [ ] Cimas Yellow: `#FFD600`
    - [ ] Cimas White: `#FFFFFF`
    - [ ] Cimas Off-White: `#F8F9FA`
  - [ ] Export shadow presets (depthShadowBlue, depthShadowYellow, navIslandShadow, whiteCardShadow)
  - [ ] Export spacing scale
  - [ ] Export typography scale (font sizes, weights, letter spacing)
  - [ ] Export transition timings (cubic-bezier curves)
  - [ ] Export blur values for decorative elements

### 1.3 Create Reusable Style Utilities
- [ ] Create `utils/styles.ts`:
  - [ ] Helper function for depth shadows (accepts color)
  - [ ] Helper function for decorative blur orbs
  - [ ] Helper function for tight text spacing
  - [ ] Helper function for super card styles
  - [ ] Helper function for active press transforms

### 1.4 Update Global Styles
- [ ] Update `global.css`:
  - [ ] Add custom CSS variables if needed
  - [ ] Add utility classes for tight text
  - [ ] Add utility classes for scrollbar hiding
  - [ ] Add any custom animations

---

## Step 2: Core Components Foundation

### 2.1 Create Base Components
- [ ] Create `components/ui/Card.tsx`:
  - [ ] Base card component with variants:
    - [ ] White card (default, `#FFFFFF`)
    - [ ] Blue accent card (Cimas Blue background or border)
    - [ ] Yellow accent card (Cimas Yellow background or border)
    - [ ] Blue-yellow gradient card (split complementary)
  - [ ] Support for depth shadows
  - [ ] Support for decorative elements
  - [ ] Rounded corners (configurable)
  - [ ] Press animations with Reanimated
  
- [ ] Create `components/ui/Text.tsx`:
  - [ ] Typography component with variants (heading, body, label, caption)
  - [ ] Support for tight letter spacing
  - [ ] Font weight presets
  - [ ] Color variants (dark gray on white background)
  
- [ ] Create `components/ui/Button.tsx`:
  - [ ] Primary button variant (Cimas Blue background with yellow accent)
  - [ ] Secondary button variant (white with blue border)
  - [ ] Accent button variant (Cimas Yellow)
  - [ ] Ghost/outline variant
  - [ ] Press animations (scale down)
  - [ ] Loading state support
  - [ ] Icon support

### 2.2 Create Decorative Components
- [ ] Create `components/decorative/BlurOrb.tsx`:
  - [ ] Configurable size, color, position
  - [ ] Blur effect using absolute positioning
  - [ ] Opacity controls
  
- [ ] Create `components/decorative/GradientBackground.tsx`:
  - [ ] Multi-color gradient support
  - [ ] Directional gradients
  - [ ] Overlay support

### 2.3 Create Navigation Component
- [ ] Create `components/navigation/FloatingDock.tsx`:
  - [ ] Dark background (`#050607` or `#111111`)
  - [ ] Rounded pill shape (40px radius)
  - [ ] Fixed bottom positioning with safe area
  - [ ] Navigation island shadow
  - [ ] Four tabs: Home, Stats, Scan (elevated), Profile
  - [ ] Elevated scan button (white pill, 70x70px)
  - [ ] Spring animations on press
  - [ ] Active state indicators
  - [ ] Integration with Expo Router navigation

---

## Step 3: Dashboard Screen Implementation

### 3.1 Dashboard Layout Structure
- [ ] Create `screens/dashboard.tsx`
- [ ] Set up ScrollView with proper padding
- [ ] Configure background color (`#FFFFFF` - Cimas White)
- [ ] Add bottom padding for floating dock clearance (130-140px)

### 3.2 Header Section
- [ ] Create header component:
  - [ ] User avatar with gradient ring border
  - [ ] Greeting text ("Good morning/afternoon/evening")
  - [ ] User name display
  - [ ] Notification bell icon button
  - [ ] Proper spacing and alignment

### 3.3 Day Selector Component
- [ ] Create `components/dashboard/DaySelector.tsx`:
  - [ ] Horizontal ScrollView
  - [ ] Day cards (Mon-Fri) with dates
  - [ ] Active day styling (dark background or Cimas Blue background, scale transform)
  - [ ] Blue or yellow dot indicator for active day
  - [ ] Smooth transitions on day change
  - [ ] Mock data for days/dates

### 3.4 Hero Card Component
- [ ] Create `components/dashboard/HeroCard.tsx`:
  - [ ] White background with blue-yellow split complementary accents
  - [ ] Blue gradient accent (left side, `#003399`)
  - [ ] Yellow gradient accent (right side, `#FFD600`)
  - [ ] Decorative blur orbs (blue orb top-left, yellow orb bottom-right)
  - [ ] Decorative shapes (yellow circle accent, blue rounded square accent)
  - [ ] "TODAY'S FOCUS" or "DAILY GOAL" pill badge (white with blue/yellow border)
  - [ ] Large title text (tight spacing, dark gray on white)
  - [ ] Subtitle text
  - [ ] Avatar row showing user + others ("+8k" indicator)
  - [ ] Depth shadow (blue-yellow combined or subtle white card shadow)
  - [ ] Proper z-index layering

### 3.5 Quick Glance Strip
- [ ] Create `components/dashboard/QuickGlance.tsx`:
  - [ ] Three pill cards in horizontal row:
    - [ ] Today's calories (dark background or Cimas Blue)
    - [ ] Streak counter with flame icon (dark background or Cimas Yellow)
    - [ ] Scans count (white with blue/yellow accent border)
  - [ ] Icon + value + label layout
  - [ ] Mock data for values

### 3.6 Goals Chips
- [ ] Create `components/dashboard/GoalsChips.tsx`:
  - [ ] Horizontal ScrollView
  - [ ] White background chips with blue/yellow accent border
  - [ ] Goal labels and values
  - [ ] Mock goal data

### 3.7 Routine Section
- [ ] Create `components/dashboard/RoutineSection.tsx`:
  - [ ] Two-column grid layout
  - [ ] **Hydration Card:**
    - [ ] Cimas Blue background (`#003399`) or white with blue accent border
    - [ ] Water icon in white/transparent pill
    - [ ] "Water Intake" title
    - [ ] Progress gauge (rounded bar, blue accent)
    - [ ] Percentage display
    - [ ] Depth shadow (blue)
    - [ ] Decorative blur orb (blue)
  - [ ] **Sleep/Recovery Card:**
    - [ ] Cimas Yellow background (`#FFD600`) or white with yellow accent border
    - [ ] Moon icon
    - [ ] "Sleep Cycle" title
    - [ ] Hours display (large number)
    - [ ] Quality rating with icon
    - [ ] Depth shadow (yellow)
    - [ ] Decorative blur orb (yellow)
  - [ ] Mock data for hydration and sleep

### 3.8 Featured Session Card
- [ ] Create `components/dashboard/FeaturedSession.tsx`:
  - [ ] White card with border
  - [ ] Thumbnail image placeholder
  - [ ] Title ("Evening Wind Down")
  - [ ] Trainer info
  - [ ] Tag badges (duration, type)
  - [ ] Proper spacing and layout

### 3.9 Extra Insight Cards
- [ ] Create `components/dashboard/InsightCards.tsx`:
  - [ ] Two white cards
  - [ ] Emoji icons
  - [ ] Titles ("Breakfast recap", "Prep for tomorrow")
  - [ ] Subtle styling

### 3.10 AI Suggested Meals
- [ ] Create `components/dashboard/SuggestedMeals.tsx`:
  - [ ] Horizontal ScrollView
  - [ ] Dark cards with colored accent dots
  - [ ] Meal title and subtitle
  - [ ] Kcal display
  - [ ] Tag badges
  - [ ] Mock meal data

### 3.11 Dashboard Animations
- [ ] Add entrance animations:
  - [ ] FadeInDown for header (delay: 0ms)
  - [ ] FadeInDown for day selector (delay: 80ms)
  - [ ] FadeInDown for hero card (delay: 150ms)
  - [ ] Staggered delays for other sections
- [ ] Add press animations for interactive elements
- [ ] Ensure smooth 60fps performance

---

## Step 4: Scan Screen Implementation

### 4.1 Scan Screen Layout
- [ ] Create `screens/scan.tsx`
- [ ] Set up ScrollView with proper padding
- [ ] Configure background color (`#FFFFFF` - Cimas White)
- [ ] Add bottom padding for floating dock

### 4.2 Scan Header
- [ ] Create header:
  - [ ] "SCAN" label (uppercase, small, gray)
  - [ ] "Meal analysis" title
  - [ ] Proper spacing

### 4.3 Hero Scan Card
- [ ] Create `components/scan/HeroScanCard.tsx`:
  - [ ] White background with blue-yellow accent accents (`#FFFFFF`)
  - [ ] Blue decorative glow blob (top-left)
  - [ ] Yellow decorative glow blob (bottom-right)
  - [ ] "TEST RUN" pill badge (white with blue/yellow border)
  - [ ] Title and subtitle explaining mock scan
  - [ ] Primary button with Cimas Blue background and yellow accent
  - [ ] Camera icon
  - [ ] Proper spacing and layout

### 4.4 Result Card Component
- [ ] Create `components/scan/ResultCard.tsx`:
  - [ ] Conditional rendering (only show when scan exists)
  - [ ] White card with subtle border (`border-gray-100`)
  - [ ] Header row:
    - [ ] Meal name (large, bold)
    - [ ] Health score pill (Cimas Blue background with yellow accent)
  - [ ] Macro row:
    - [ ] Three chips (Protein, Carbs, Fat)
    - [ ] Colored labels matching semantic colors
    - [ ] Values display
  - [ ] iGo Tip card:
    - [ ] White background with blue-yellow accent border
    - [ ] Leaf icon (blue or yellow)
    - [ ] Encouraging tip text
  - [ ] Mock result data structure

### 4.5 Empty State Component
- [ ] Create `components/scan/EmptyState.tsx`:
  - [ ] Centered white card
  - [ ] Image outline icon
  - [ ] "No scans yet" message
  - [ ] Subtitle text
  - [ ] Conditional rendering (show when no scan)

### 4.6 Suggested Follow-up Meals
- [ ] Create `components/scan/SuggestedMeals.tsx`:
  - [ ] Horizontal ScrollView
  - [ ] Dark cards with colored accent dots
  - [ ] Meal suggestions with descriptions
  - [ ] Conditional rendering (show when scan exists)
  - [ ] Mock meal data

### 4.7 Scan Screen State Management
- [ ] Set up state for scan results
- [ ] Mock scan function (simulate API call)
- [ ] Loading state handling
- [ ] Error state handling (for "No image selected")

### 4.8 Scan Screen Animations
- [ ] Add entrance animations for cards
- [ ] Add loading spinner animation
- [ ] Add result card slide-in animation
- [ ] Smooth transitions between states

---

## Step 5: Stats Screen Implementation

### 5.1 Stats Screen Layout
- [ ] Create `screens/stats.tsx`
- [ ] Set up ScrollView with proper padding
- [ ] Configure background color (`#FFFFFF` - Cimas White)
- [ ] Add bottom padding for floating dock

### 5.2 Stats Header
- [ ] Create header:
  - [ ] "THIS WEEK" label (uppercase, small)
  - [ ] "Statistics" title
  - [ ] Proper spacing

### 5.3 Stats Hero Card
- [ ] Create `components/stats/StatsHero.tsx`:
  - [ ] White background with blue-yellow split complementary accents
  - [ ] Blue gradient accent (left side)
  - [ ] Yellow gradient accent (right side)
  - [ ] Decorative blobs and orbs (blue and yellow)
  - [ ] "THIS WEEK" pill (white with blue/yellow border)
  - [ ] Title and subtitle
  - [ ] Metrics row:
    - [ ] Avg kcal
    - [ ] Best score
    - [ ] Consistency grade
  - [ ] Depth shadow (blue-yellow combined)
  - [ ] Mock weekly data

### 5.4 At a Glance Section
- [ ] Create `components/stats/AtAGlance.tsx`:
  - [ ] Four stat rows:
    - [ ] Calories
    - [ ] Protein
    - [ ] Carbs
    - [ ] Health Score
  - [ ] Each row:
    - [ ] Icon in colored background pill
    - [ ] Label and value
    - [ ] Trend badge (up/down arrow with percentage)
  - [ ] Mock stat data with trends

### 5.5 AI Insights Rail
- [ ] Create `components/stats/InsightsRail.tsx`:
  - [ ] Horizontal ScrollView
  - [ ] Dark cards with colored accent dots
  - [ ] Insight title and body text
  - [ ] Mock insight data

### 5.6 Daily Graph Component
- [ ] Create `components/stats/DailyGraph.tsx`:
  - [ ] White card with border
  - [ ] Bar chart with six time slots (6a, 9a, 12p, 3p, 6p, 9p)
  - [ ] Colored bars (gray → protein → carbs based on height)
  - [ ] Badge showing current/target calories
  - [ ] Use react-native-svg or custom View-based bars
  - [ ] Mock daily calorie data
  - [ ] Animated bar entrance (FadeInUp)

### 5.7 Macro Summary Component
- [ ] Create `components/stats/MacroSummary.tsx`:
  - [ ] White card with border
  - [ ] Three macro progress bars:
    - [ ] Protein (purple)
    - [ ] Carbs (orange)
    - [ ] Fat (green)
  - [ ] Each bar shows:
    - [ ] Label
    - [ ] Current/target values
    - [ ] Colored progress bar
    - [ ] Percentage
  - [ ] Mock macro data
  - [ ] Animated progress bars

### 5.8 Health Score Card
- [ ] Create `components/stats/HealthScoreCard.tsx`:
  - [ ] Black card with circular progress ring
  - [ ] Score value in center (large number)
  - [ ] Description text
  - [ ] Tag badges ("Good", "+5 pts")
  - [ ] Use react-native-svg for circular progress
  - [ ] Mock health score data
  - [ ] Animated progress ring

### 5.9 Stats Screen Animations
- [ ] Add entrance animations for all sections
- [ ] Staggered delays for sequential appearance
- [ ] Animated progress bars and rings
- [ ] Smooth chart animations

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
- [ ] Configure `app/_layout.tsx`:
  - [ ] NativeWindProvider wrapper
  - [ ] Font loading (Plus Jakarta Sans)
  - [ ] SafeAreaProvider
  - [ ] StatusBar configuration
  - [ ] Root navigation structure

### 7.2 Tab Layout Configuration
- [ ] Configure `app/(tabs)/_layout.tsx`:
  - [ ] Hide default tab bar
  - [ ] Set up screen routes
  - [ ] Configure navigation options

### 7.3 Screen Routes
- [ ] Create `app/(tabs)/index.tsx` → Dashboard screen
- [ ] Create `app/(tabs)/scan.tsx` → Scan screen
- [ ] Create `app/(tabs)/stats.tsx` → Stats screen
- [ ] Create `app/(tabs)/profile.tsx` → Profile screen

### 7.4 Floating Dock Integration
- [ ] Integrate FloatingDock with Expo Router:
  - [ ] Use `useRouter()` and `usePathname()` hooks
  - [ ] Handle navigation on tab press
  - [ ] Update active state based on current route
  - [ ] Handle scan button navigation

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
  - [ ] Large titles: 28-32px, weight 900, tight spacing
  - [ ] Section titles: 18-20px, weight 800
  - [ ] Body text: 12-14px, weight 500-600
  - [ ] Labels: 10-12px, weight 700, uppercase
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
  - [ ] Blue accent cards use depthShadowBlue (Cimas Blue)
  - [ ] Yellow accent cards use depthShadowYellow (Cimas Yellow)
  - [ ] White cards use subtle whiteCardShadow
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

