import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SHADOWS, RADIUS, TYPOGRAPHY, ANIMATION } from '../constants/design';
import { withSpring } from 'react-native-reanimated';

export const GlobalStyles = StyleSheet.create({
  superCard: {
    borderRadius: RADIUS['3xl'],
    backgroundColor: COLORS.background,
  },
  blueAccentCard: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.depthBlue,
  },
  yellowAccentCard: {
    backgroundColor: COLORS.accent,
    ...SHADOWS.depthYellow,
  },
  whiteCard: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    ...SHADOWS.whiteCard,
  },
  tightText: {
    letterSpacing: TYPOGRAPHY.letterSpacing.tight,
  },
  tighterText: {
    letterSpacing: TYPOGRAPHY.letterSpacing.tighter,
  }
});

/**
 * Returns a React Native Reanimated object with dynamic spring physics scaling logic.
 * Scales down slightly to visually represent a button press based on the token physics.
 */
export const getActivePressScale = () => {
  'worklet';
  return withSpring(0.96, ANIMATION.spring);
};

/**
 * Returns a standard 1.0 unpressed scale state with proper spring physics bridging to the token.
 */
export const getInactivePressScale = () => {
  'worklet';
  return withSpring(1, ANIMATION.spring);
};
