/**
 * Reusable Style Utilities
 * Helper functions for creating consistent styles based on design tokens
 */

import { Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import {
  colors,
  depthShadowBlue,
  depthShadowYellow,
  navIslandShadow,
  whiteCardShadow,
  borderRadius,
  spacing,
  typography,
  transitions,
  blur,
  opacity,
  scale,
  getShadowStyle,
} from '../constants/design';

// ============================================================================
// Shadow Helpers
// ============================================================================

/**
 * Creates depth shadow style for blue accent cards
 * Returns platform-specific shadow styles
 */
export const createDepthShadowBlue = (): ViewStyle => {
  return getShadowStyle('blue') as ViewStyle;
};

/**
 * Creates depth shadow style for yellow accent cards
 * Returns platform-specific shadow styles
 */
export const createDepthShadowYellow = (): ViewStyle => {
  return getShadowStyle('yellow') as ViewStyle;
};

/**
 * Creates navigation island shadow style
 * Returns platform-specific shadow styles
 */
export const createNavIslandShadow = (): ViewStyle => {
  return {
    ...getShadowStyle('nav'),
    borderColor: navIslandShadow.borderColor,
    borderWidth: navIslandShadow.borderWidth,
  } as ViewStyle;
};

/**
 * Creates subtle white card shadow style
 * Returns platform-specific shadow styles
 */
export const createWhiteCardShadow = (): ViewStyle => {
  return getShadowStyle('white') as ViewStyle;
};

/**
 * Creates a custom depth shadow with specified color
 * @param color - Hex color string (e.g., '#003399')
 * @param intensity - Shadow intensity (0-1)
 */
export const createCustomDepthShadow = (
  color: string,
  intensity: number = 0.4
): ViewStyle => {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: intensity,
      shadowRadius: 20,
    },
    android: {
      elevation: 8,
    },
  }) as ViewStyle;
};

// ============================================================================
// Decorative Blur Orb Helpers
// ============================================================================

/**
 * Creates style for decorative blur orb
 * @param size - Size in pixels (width and height)
 * @param color - Base color for the orb
 * @param blurAmount - Blur amount (default: blur-2xl = 64px)
 * @param opacity - Opacity (0-1, default: 0.4-0.5)
 */
export const createBlurOrb = (
  size: number,
  color: string,
  blurAmount: number = blur['2xl'],
  opacityValue: number = opacity['40']
): ViewStyle => {
  return {
    position: 'absolute',
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 2,
    opacity: opacityValue,
    // Note: React Native doesn't support CSS blur, so we use opacity and positioning
    // For actual blur effect, consider using react-native-blur or similar library
  } as ViewStyle;
};

/**
 * Creates style for decorative blur orb with negative margins
 * Used for extending orbs beyond card boundaries
 * @param size - Size in pixels
 * @param color - Base color
 * @param offsetX - Horizontal offset (negative for extending left)
 * @param offsetY - Vertical offset (negative for extending top)
 */
export const createBlurOrbWithOffset = (
  size: number,
  color: string,
  offsetX: number = 0,
  offsetY: number = 0
): ViewStyle => {
  return {
    ...createBlurOrb(size, color),
    marginLeft: offsetX,
    marginTop: offsetY,
  } as ViewStyle;
};

// ============================================================================
// Typography Helpers
// ============================================================================

/**
 * Creates tight text style for large headings
 * Uses -0.04em letter spacing for premium feel
 */
export const createTightText = (): TextStyle => {
  return {
    letterSpacing: typography.letterSpacing.tight,
  } as TextStyle;
};

/**
 * Creates uppercase label style
 * Small text, bold, wide letter spacing
 */
export const createLabelStyle = (): TextStyle => {
  return {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: 'uppercase',
  } as TextStyle;
};

/**
 * Creates hero heading style
 * Large text, black weight, tight spacing
 */
export const createHeroHeading = (): TextStyle => {
  return {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.black,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.fontSize['5xl'] * typography.lineHeight.tight,
  } as TextStyle;
};

/**
 * Creates section heading style
 * Medium-large text, extrabold weight, tight spacing
 */
export const createSectionHeading = (): TextStyle => {
  return {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.extrabold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.snug,
  } as TextStyle;
};

// ============================================================================
// Card Style Helpers
// ============================================================================

/**
 * Creates super card style (large rounded corners, 40px)
 * Used for hero cards and featured cards
 */
export const createSuperCardStyle = (): ViewStyle => {
  return {
    borderRadius: borderRadius['3xl'],
    overflow: 'hidden',
  } as ViewStyle;
};

/**
 * Creates white card style with subtle border and shadow
 */
export const createWhiteCardStyle = (): ViewStyle => {
  return {
    backgroundColor: colors['cimas-white'],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)', // border-gray-100 equivalent
    ...createWhiteCardShadow(),
  } as ViewStyle;
};

/**
 * Creates colored card style with depth shadow
 * @param backgroundColor - Background color
 * @param shadowType - Type of shadow ('blue' | 'yellow')
 */
export const createColoredCardStyle = (
  backgroundColor: string,
  shadowType: 'blue' | 'yellow' = 'blue'
): ViewStyle => {
  const shadowStyle =
    shadowType === 'blue' ? createDepthShadowBlue() : createDepthShadowYellow();

  return {
    backgroundColor,
    borderRadius: borderRadius['3xl'],
    overflow: 'hidden',
    ...shadowStyle,
  } as ViewStyle;
};

// ============================================================================
// Transform Helpers
// ============================================================================

/**
 * Creates press transform style (scale down on press)
 * Used for interactive elements
 */
export const createPressTransform = (): ViewStyle => {
  return {
    transform: [{ scale: scale.press }],
  } as ViewStyle;
};

/**
 * Creates hover transform style (scale up slightly)
 * Used for hover states (web)
 */
export const createHoverTransform = (): ViewStyle => {
  return {
    transform: [{ scale: scale.hover }],
  } as ViewStyle;
};

/**
 * Creates active button transform style
 * More aggressive scale down for buttons
 */
export const createActiveTransform = (): ViewStyle => {
  return {
    transform: [{ scale: scale.active }],
  } as ViewStyle;
};

/**
 * Creates scale transform with custom value
 * @param value - Scale value (0-2)
 */
export const createScaleTransform = (value: number): ViewStyle => {
  return {
    transform: [{ scale: value }],
  } as ViewStyle;
};

// ============================================================================
// Gradient Helpers
// ============================================================================

/**
 * Creates gradient colors array for blue-yellow split complementary
 * Returns array of color stops for LinearGradient
 */
export const createBlueYellowGradient = (): string[] => {
  return [colors['cimas-blue'], colors['cimas-yellow']];
};

/**
 * Creates gradient colors array with multiple stops
 * @param colors - Array of color strings
 */
export const createCustomGradient = (colors: string[]): string[] => {
  return colors;
};

// ============================================================================
// Spacing Helpers
// ============================================================================

/**
 * Creates padding style with consistent spacing
 * @param size - Spacing size key (e.g., 'md', 'lg')
 */
export const createPadding = (size: keyof typeof spacing): ViewStyle => {
  return {
    padding: spacing[size],
  } as ViewStyle;
};

/**
 * Creates horizontal padding style
 * @param size - Spacing size key
 */
export const createHorizontalPadding = (
  size: keyof typeof spacing
): ViewStyle => {
  return {
    paddingHorizontal: spacing[size],
  } as ViewStyle;
};

/**
 * Creates vertical padding style
 * @param size - Spacing size key
 */
export const createVerticalPadding = (
  size: keyof typeof spacing
): ViewStyle => {
  return {
    paddingVertical: spacing[size],
  } as ViewStyle;
};

/**
 * Creates gap style for flex layouts
 * @param size - Spacing size key
 */
export const createGap = (size: keyof typeof spacing): ViewStyle => {
  return {
    gap: spacing[size],
  } as ViewStyle;
};

// ============================================================================
// Combined Style Helpers
// ============================================================================

/**
 * Creates complete hero card style
 * Combines super card, colored background, and depth shadow
 * @param backgroundColor - Background color
 * @param shadowType - Shadow type ('blue' | 'yellow')
 */
export const createHeroCardStyle = (
  backgroundColor: string,
  shadowType: 'blue' | 'yellow' = 'blue'
): ViewStyle => {
  return {
    ...createSuperCardStyle(),
    ...createColoredCardStyle(backgroundColor, shadowType),
    padding: spacing.xl,
  } as ViewStyle;
};

/**
 * Creates complete white card style with padding
 * @param paddingSize - Padding size key
 */
export const createPaddedWhiteCard = (
  paddingSize: keyof typeof spacing = 'md'
): ViewStyle => {
  return {
    ...createWhiteCardStyle(),
    padding: spacing[paddingSize],
  } as ViewStyle;
};

// ============================================================================
// Animation Helpers
// ============================================================================

/**
 * Creates transition style for smooth animations
 * Note: React Native uses Animated API, but this provides timing values
 */
export const createSpringTransition = () => {
  return {
    duration: transitions.spring.duration,
    easing: transitions.spring.easing,
  };
};

/**
 * Creates smooth transition timing
 */
export const createSmoothTransition = () => {
  return {
    duration: transitions.smooth.duration,
    easing: transitions.smooth.easing,
  };
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Combines multiple style objects
 * Useful for composing styles
 */
export const combineStyles = (...styles: (ViewStyle | TextStyle | ImageStyle)[]): ViewStyle | TextStyle | ImageStyle => {
  return Object.assign({}, ...styles);
};

/**
 * Conditionally applies style based on condition
 * @param condition - Boolean condition
 * @param style - Style to apply if condition is true
 */
export const conditionalStyle = <T extends ViewStyle | TextStyle | ImageStyle>(
  condition: boolean,
  style: T
): T | {} => {
  return condition ? style : {};
};

