import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/design';

interface GradientBackgroundProps {
  variant?: 'blue-yellow' | 'blue-fade' | 'dark-fade';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'blue-yellow',
  style,
  children
}) => {
  let colors: readonly [string, string, ...string[]] = [COLORS.primary, COLORS.accent];
  let start = { x: 0, y: 0 };
  let end = { x: 1, y: 1 };

  switch (variant) {
    case 'blue-fade':
      colors = [COLORS.primary, 'transparent'];
      end = { x: 0, y: 1 };
      break;
    case 'dark-fade':
      colors = ['rgba(0,0,0,0.8)', 'transparent'];
      end = { x: 0, y: 1 };
      break;
    case 'blue-yellow':
    default:
      colors = [COLORS.primary, '#0055ff', COLORS.accent];
      start = { x: 0, y: 0 };
      end = { x: 1, y: 1 };
      break;
  }

  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
