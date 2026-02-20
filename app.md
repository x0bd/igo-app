# Project: iGo Vision AI - Current App Documentation

## Overview
This document describes the current state of the iGo Vision AI mobile application built with Expo, React Native, and custom styling (currently using StyleSheet with a custom theme system). The app is being migrated to NativeWind for styling.

---

## 1. App Architecture

### Tech Stack (Current)
- **Framework:** Expo SDK 54+ with Expo Router
- **UI:** React Native StyleSheet with custom theme system
- **Animations:** React Native Reanimated
- **Icons:** Ionicons (@expo/vector-icons)
- **Fonts:** Plus Jakarta Sans (via @expo-google-fonts/plus-jakarta-sans)
- **Navigation:** Custom floating dock navigation (not using Expo Router tabs)

### Project Structure
```
mobile/
├── app/
│   ├── _layout.tsx          # Root layout with theme provider
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tab layout (hidden tabs)
│   │   └── index.tsx        # Main app entry with screen router
│   └── modal.tsx            # Placeholder modal screen
├── screens/
│   ├── dashboard.tsx        # Main home/dashboard screen
│   ├── scan.tsx             # Meal scanning interface
│   ├── stats.tsx            # Analytics and statistics
│   └── profile.tsx          # User profile and settings
├── components/
│   ├── floating-dock.tsx    # Custom bottom navigation dock
│   ├── area-chart.tsx       # SVG area chart component
│   └── ...                  # Other utility components
└── constants/
    └── theme.ts             # Design tokens and theme system
```

---

## 2. Design System & Theme

### Brand Colors
- **Cimas Blue:** `#003399` (Primary brand color)
- **iGo Green:** `#4CAF50` (Secondary/accent)
- **Accent Orange:** `#FF9800` (Calories/energy)

### Semantic Colors
- **Protein:** `#AF52DE` (Purple)
- **Carbs:** `#FF9500` (Orange)
- **Fat:** `#34C759` (Green)
- **Health Score:** `#007AFF` (Blue)

### Neutral Palette
- Comprehensive gray scale from `gray50` (#FAFAFA) to `gray950` (#1C1C1E)
- White: `#FFFFFF`
- Black: `#000000`

### Design Tokens
- **Border Radius:** `radiusXs: 8`, `radiusSm: 12`, `radiusMd: 16`, `radiusLg: 20`, `radiusXl: 28`, `radiusFull: 100`
- **Spacing:** 4, 6, 8, 12, 16, 20, 24, 32
- **Shadows:** `shadowSm`, `shadowMd`, `shadowLg`, `shadowDock` (with elevation for Android)

### Typography
- **Font Family:** Plus Jakarta Sans (multiple weights: 400, 500, 600, 700, 800)
- **Font Sizes:** 10px - 32px (varies by component)
- **Font Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)
- **Letter Spacing:** Negative for large headings (-0.5 to -1.4), positive for labels (0.2 to 1.4)

---

## 3. Screen Descriptions

### 3.1 Dashboard Screen (`screens/dashboard.tsx`)

**Purpose:** Main home screen with overview of daily nutrition, goals, and quick actions.

**Key Components:**
1. **Header Section:**
   - User avatar with initials in circular ring
   - Greeting text ("Good morning") and user name
   - Notification bell icon button

2. **Day Selector:**
   - Horizontal scrollable chips for week days (Mon-Fri)
   - Active day highlighted with dark background and purple dot indicator
   - Date numbers displayed

3. **Hero Card:**
   - Large purple gradient card with decorative blobs/orbs
   - "TODAY'S FOCUS" label pill
   - Title: "Scan your lunch with iGo"
   - Subtitle with value proposition
   - Avatar row showing user + others ("+8k" indicator)

4. **Quick Glance Strip:**
   - Three pill cards in a row:
     - Today's calories (dark background)
     - Streak counter with flame icon (dark background)
     - Scans count (light green background)

5. **Goals Chips:**
   - Horizontal scrollable chips with daily goals
   - Light purple background with border

6. **Routine Section:**
   - **Hydration Card:** Blue card with water icon, progress gauge, percentage
   - **Sleep/Recovery Card:** Orange card with moon icon, hours display, quality rating

7. **Featured Session Card:**
   - White card with thumbnail placeholder
   - "Evening check-in" title
   - Coach info and tags (duration, type)

8. **Extra Insight Cards:**
   - Two white cards with emoji icons
   - "Breakfast recap" and "Prep for tomorrow" insights

9. **AI Suggested Meals:**
   - Horizontal scrollable dark cards
   - Meal title, subtitle, kcal, and tag badges
   - Colored accent dots

**Styling Characteristics:**
- Background: `#FAFAFA` (light gray)
- Cards use rounded corners (20-40px radius)
- Heavy use of shadows for depth
- Animated entrances using Reanimated (FadeInDown with staggered delays)
- Purple/blue gradient hero card with decorative elements

---

### 3.2 Scan Screen (`screens/scan.tsx`)

**Purpose:** Interface for scanning meals and viewing analysis results.

**Key Components:**
1. **Header:**
   - "SCAN" label (uppercase, small)
   - "Meal analysis" title

2. **Hero Scan Card:**
   - Warm beige/cream background (`#FFFBF8`)
   - Decorative glow blobs (top right, bottom left)
   - "TEST RUN" pill badge
   - Title and subtitle explaining mock scan
   - Primary green button with camera icon

3. **Result Card (conditional):**
   - White card with border
   - Header row: meal name + health score pill (green background)
   - Macro row: Three chips showing Protein, Carbs, Fat with colored labels
   - iGo Tip card: Green background with leaf icon and encouraging tip text

4. **Empty State (when no scan):**
   - Centered white card
   - Image outline icon
   - "No scans yet" message

5. **Suggested Follow-up (conditional):**
   - Horizontal scrollable cards
   - Dark cards with colored accent dots
   - Meal suggestions with descriptions

**Styling Characteristics:**
- Background: `#F8F9FC` (very light gray-blue)
- Warm color palette for hero card
- Green accent for primary actions and tips
- Conditional rendering based on scan state

---

### 3.3 Stats Screen (`screens/stats.tsx`)

**Purpose:** Detailed analytics, trends, and health metrics.

**Key Components:**
1. **Header:**
   - "THIS WEEK" label
   - "Statistics" title

2. **Stats Hero Card:**
   - Purple gradient card (similar to dashboard hero)
   - Decorative blobs and orbs
   - "THIS WEEK" pill
   - Title and subtitle
   - Metrics row: Avg kcal, Best score, Consistency grade

3. **At a Glance Section:**
   - Four stat rows with:
     - Icon in colored background pill
     - Label and value
     - Trend badge (up/down arrow with percentage)
   - Stats: Calories, Protein, Carbs, Health Score

4. **AI Insights Rail:**
   - Horizontal scrollable dark cards
   - Colored accent dots
   - Insight title and body text

5. **Daily Graph:**
   - White card with bar chart
   - Six time slots (6a, 9a, 12p, 3p, 6p, 9p)
   - Colored bars (gray → protein → carbs based on height)
   - Badge showing current/target calories

6. **Macro Summary:**
   - White card with three macro progress bars
   - Each shows: label, current/target, colored progress bar
   - Protein (purple), Carbs (orange), Fat (green)

7. **Health Score Card:**
   - Black card with circular progress ring
   - Score value in center (78)
   - Description text
   - Tag badges (Good, +5 pts)

**Styling Characteristics:**
- Background: `#F8F9FC`
- Data visualization with charts and progress bars
- Dark cards for emphasis
- Color-coded metrics

---

### 3.4 Profile Screen (`screens/profile.tsx`)

**Purpose:** User account, settings, and preferences.

**Key Components:**
1. **Header:**
   - "ACCOUNT" label
   - "Profile" title

2. **Profile Header:**
   - Large circular avatar (80px) with initials
   - User name
   - Email address
   - Premium member badge with ribbon icon

3. **Quick Stats Row:**
   - Three-column white card
   - Stats: Meals Scanned, Day Streak, Avg Score
   - Vertical dividers between stats

4. **Settings Groups:**
   - **PREFERENCES:**
     - Daily Goals (with subtitle)
     - Notifications (with subtitle)
     - Appearance (with subtitle)
   - **OTHER:**
     - Cimas Health Connect
     - Privacy & Data
     - Help & Support
   - **Sign Out** (destructive, red)

5. **Footer:**
   - App version
   - "Powered by Cimas Health Group"

**Styling Characteristics:**
- Background: `#F8F9FC`
- Clean, minimal settings list
- Icon + label + chevron pattern
- Destructive actions in red

---

## 4. Navigation System

### Floating Dock (`components/floating-dock.tsx`)

**Design:**
- Dark background (`#050607`) with rounded pill shape (40px radius)
- Positioned at bottom with safe area padding
- Elevated shadow for depth
- Border with subtle white opacity

**Tabs:**
1. **Home** - Grid icon
2. **Stats** - Analytics icon
3. **Scan** - Camera icon (elevated center button)
4. **Profile** - Person icon

**Scan Button:**
- Elevated white pill button (70x70px)
- Positioned above dock with negative margin
- Black border (4px)
- White background with shadow
- Camera icon (24px)

**Interactions:**
- Spring animations on press (scale down to 0.85-0.88)
- Active state: subtle background highlight
- Smooth transitions using Reanimated

---

## 5. Component Library

### Area Chart (`components/area-chart.tsx`)
- SVG-based area chart with gradient fill
- Smooth bezier curves
- Configurable colors and dimensions
- Animated entrance

### Themed Components
- `themed-text.tsx` - Text with theme support
- `themed-view.tsx` - View with theme support

---

## 6. Animation Patterns

**Entrance Animations:**
- `FadeInDown` - Most common, with duration 400-600ms
- `FadeInUp` - For upward elements (bars in charts)
- `FadeIn` - Simple fade
- Staggered delays (80ms, 100ms, 150ms, etc.) for sequential appearance

**Interaction Animations:**
- Spring animations for button presses
- Scale transforms (0.85-0.88 on press)
- Smooth damping and stiffness values

**Reanimated Usage:**
- `useSharedValue` for animated values
- `useAnimatedStyle` for style interpolation
- `withSpring` for natural motion

---

## 7. Styling Patterns

### Card Design
- White background (`#FFFFFF`)
- Rounded corners (20-40px, often 26-32px)
- Subtle borders (`rgba(0,0,0,0.04)`)
- Shadow presets (light, medium, heavy)
- Padding: 14-20px typically

### Typography Hierarchy
- **Large Titles:** 28-32px, weight 900, negative letter spacing
- **Section Titles:** 18-20px, weight 800
- **Body Text:** 12-14px, weight 500-600
- **Labels:** 10-12px, weight 700, uppercase, letter spacing 1.0-1.4

### Color Usage
- Dark backgrounds for hero cards (`#111827`, `#050607`)
- Purple gradients for primary hero sections
- Green for positive actions and tips
- Orange for energy/calories
- Semantic colors for macros

### Spacing
- Screen padding: 20px horizontal
- Card gaps: 10-18px
- Section spacing: 20-32px
- Bottom padding: 130-140px (for dock clearance)

---

## 8. Current Implementation Notes

- Uses React Native `StyleSheet` API (not NativeWind yet)
- Custom theme object (`IGO`) imported from `constants/theme.ts`
- Plus Jakarta Sans font loaded via Expo Fonts
- Reanimated for all animations
- Ionicons for all iconography
- Custom navigation (not using Expo Router tabs)
- Screen routing handled in `app/(tabs)/index.tsx` with state management