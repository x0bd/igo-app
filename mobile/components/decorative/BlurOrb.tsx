import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/design';

interface BlurOrbProps {
  color?: 'blue' | 'yellow' | string;
  size?: number;
  opacity?: number;
  blur?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A purely decorative absolute-positioned glowing orb used to construct the Brutalist background highlights.
 * Renders underneath card content using absolute positioning.
 */
const BlurOrb: React.FC<BlurOrbProps> = ({
  color = 'blue',
  size = 120,
  opacity = 0.4,
  blur = 40,
  style,
}) => {
  const getOrbColor = () => {
    switch(color) {
      case 'blue': return COLORS.primary;
      case 'yellow': return COLORS.accent;
      default: return color;
    }
  };

  return (
    <View
      className="absolute rounded-full"
      style={[
        {
          width: size,
          height: size,
          backgroundColor: getOrbColor(),
          opacity: opacity,
          // Note: In React Native, true CSS blur is difficult without heavy native modules like react-native-blur.
          // We simulate the brutalist soft-glow by utilizing strong transparent shadow dispersion on a hidden element.
          shadowColor: getOrbColor(),
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: opacity,
          shadowRadius: blur,
          elevation: blur / 2, // Android simulation
        },
        style
      ]}
    >
      <View style={{ flex: 1, backgroundColor: 'transparent' }} />
    </View>
  );
};

export default BlurOrb;
