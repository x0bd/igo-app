/**
 * Design Tokens - Cimas iGo Vision AI
 * Based on design inspiration with white background and blue/yellow accents
 */

import { Platform } from 'react-native';

// ============================================================================
// Color Palette
// ============================================================================

export const colors = {
  // Cimas Brand Colors
  'cimas-blue': '#003399',
  'cimas-yellow': '#FFD600',
  'cimas-white': '#FFFFFF',
  'cimas-off-white': '#F8F9FA',

  // Semantic Colors (for nutrition data)
  protein: '#AF52DE',
  carbs: '#FF9500',
  fat: '#34C759',
  'health-score': '#007AFF',

  // Text Colors
  'text-primary': '#1A1A1A',
  'text-secondary': '#6B7280',
  'text-tertiary': '#9CA3AF',
  'text-white': '#FFFFFF',

  // Background Colors
  background: '#FFFFFF',
  'background-subtle': '#F8F9FA',
  'background-dark': '#111111',
  'background-dark-secondary': '#1A1A1A',
} as const;

// ============================================================================
// Shadow Presets (Depth Shadows)
// ============================================================================

/**
 * Cimas Blue depth shadow - Multi-layer colored shadow with inset highlight
 * Creates premium depth effect for blue accent cards
 */
export const depthShadowBlue = {
  shadowColor: '#003399',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.4,
  shadowRadius: 20,
  elevation: 8, // Android
  // Additional layers for web/advanced styling
  shadowColor2: '#003399',
  shadowOffset2: { width: 0, height: 5 },
  shadowOpacity2: 0.2,
  shadowRadius2: 10,
  // Inset highlight
  insetShadow: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
};

/**
 * Cimas Yellow depth shadow - Multi-layer colored shadow with inset highlight
 * Creates premium depth effect for yellow accent cards
 */
export const depthShadowYellow = {
  shadowColor: '#FFD600',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.4,
  shadowRadius: 20,
  elevation: 8, // Android
  // Additional layers
  shadowColor2: '#FFD600',
  shadowOffset2: { width: 0, height: 5 },
  shadowOpacity2: 0.2,
  shadowRadius2: 10,
  // Inset highlight
  insetShadow: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
};

/**
 * Navigation island shadow - Deep shadow with subtle white border glow
 * Creates floating effect for bottom navigation
 */
export const navIslandShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.5,
  shadowRadius: 25,
  elevation: 12, // Android
  // Border glow effect
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
};

/**
 * White card shadow - Subtle shadow for white cards on white background
 * Creates gentle depth without being too prominent
 */
export const whiteCardShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.05,
  shadowRadius: 15,
  elevation: 2, // Android
};

/**
 * Combined blue-yellow shadow for split complementary accent cards
 */
export const depthShadowBlueYellow = {
  ...depthShadowBlue,
  // Can be layered with yellow shadow for gradient effect
  yellowShadow: {
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
};

// ============================================================================
// Spacing Scale
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// Screen padding
export const screenPadding = {
  horizontal: 24, // px-6
  vertical: 16,
} as const;

// Card padding
export const cardPadding = {
  sm: 16, // p-4
  md: 20, // p-5
  lg: 24, // p-6
  xl: 32, // p-8
} as const;

// ============================================================================
// Typography Scale
// ============================================================================

export const typography = {
  // Font Family
  fontFamily: {
    sans: 'PlusJakartaSans',
    'sans-medium': 'PlusJakartaSans-Medium',
    'sans-semibold': 'PlusJakartaSans-SemiBold',
    'sans-bold': 'PlusJakartaSans-Bold',
    'sans-extrabold': 'PlusJakartaSans-ExtraBold',
  },

  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.04, // -0.04em for large headings
    normal: 0,
    wide: 0.5,
    wider: 1.0,
    widest: 1.4,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 0.9, // For large headings
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Typography Presets
export const typographyPresets = {
  // Large headings (hero text)
  headingHero: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.black,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.lineHeight.tight,
  },
  // Section headings
  headingSection: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.extrabold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.lineHeight.snug,
  },
  // Body text
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.normal,
  },
  // Labels (uppercase)
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.widest,
    lineHeight: typography.lineHeight.normal,
    textTransform: 'uppercase' as const,
  },
  // Caption text
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.normal,
  },
} as const;

// ============================================================================
// Border Radius
// ============================================================================

export const borderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  '2xl': 32,
  '3xl': 40, // Super cards (2.5rem)
  full: 9999,
} as const;

// ============================================================================
// Transition Timings & Easing
// ============================================================================

export const transitions = {
  // Spring animation (bouncy, natural feel)
  spring: {
    duration: 300,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy spring
  },
  // Smooth transitions
  smooth: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Fast transitions
  fast: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Slow transitions
  slow: {
    duration: 500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// Blur Values (for decorative elements)
// ============================================================================

export const blur = {
  sm: 8, // blur-sm
  md: 16, // blur-md
  lg: 24, // blur-lg
  xl: 40, // blur-xl
  '2xl': 64, // blur-2xl
  '3xl': 80, // blur-3xl
} as const;

// ============================================================================
// Opacity Values
// ============================================================================

export const opacity = {
  '10': 0.1,
  '20': 0.2,
  '30': 0.3,
  '40': 0.4,
  '50': 0.5,
  '60': 0.6,
  '70': 0.7,
  '80': 0.8,
  '90': 0.9,
  full: 1.0,
} as const;

// ============================================================================
// Scale Values (for transforms)
// ============================================================================

export const scale = {
  press: 0.96, // Active state press
  hover: 1.05, // Hover state
  active: 0.9, // Button active state
  normal: 1.0,
} as const;

// ============================================================================
// Z-Index Layers
// ============================================================================

export const zIndex = {
  base: 0,
  elevated: 10,
  dropdown: 20,
  overlay: 30,
  modal: 40,
  navigation: 50,
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get shadow style for React Native (simplified version)
 * Note: React Native doesn't support multiple shadows, so we use the primary shadow
 */
export const getShadowStyle = (shadowType: 'blue' | 'yellow' | 'nav' | 'white') => {
  switch (shadowType) {
    case 'blue':
      return Platform.select({
        ios: {
          shadowColor: depthShadowBlue.shadowColor,
          shadowOffset: depthShadowBlue.shadowOffset,
          shadowOpacity: depthShadowBlue.shadowOpacity,
          shadowRadius: depthShadowBlue.shadowRadius,
        },
        android: {
          elevation: depthShadowBlue.elevation,
        },
      });
    case 'yellow':
      return Platform.select({
        ios: {
          shadowColor: depthShadowYellow.shadowColor,
          shadowOffset: depthShadowYellow.shadowOffset,
          shadowOpacity: depthShadowYellow.shadowOpacity,
          shadowRadius: depthShadowYellow.shadowRadius,
        },
        android: {
          elevation: depthShadowYellow.elevation,
        },
      });
    case 'nav':
      return Platform.select({
        ios: {
          shadowColor: navIslandShadow.shadowColor,
          shadowOffset: navIslandShadow.shadowOffset,
          shadowOpacity: navIslandShadow.shadowOpacity,
          shadowRadius: navIslandShadow.shadowRadius,
        },
        android: {
          elevation: navIslandShadow.elevation,
        },
      });
    case 'white':
      return Platform.select({
        ios: {
          shadowColor: whiteCardShadow.shadowColor,
          shadowOffset: whiteCardShadow.shadowOffset,
          shadowOpacity: whiteCardShadow.shadowOpacity,
          shadowRadius: whiteCardShadow.shadowRadius,
        },
        android: {
          elevation: whiteCardShadow.elevation,
        },
      });
    default:
      return {};
  }
};

