import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GlobalStyles, getActivePressScale, getInactivePressScale } from '../../utils/styles';
import { COLORS } from '../../constants/design';

export type CardVariant = 'default' | 'blue' | 'yellow' | 'gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  padding?: number;
  activeOpacity?: number;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  style,
  onPress,
  padding = 24,
  activeOpacity = 1
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const getVariantStyle = () => {
    switch(variant) {
      case 'blue': return GlobalStyles.blueAccentCard;
      case 'yellow': return GlobalStyles.yellowAccentCard;
      case 'gradient': 
        return {
          backgroundColor: COLORS.background,
          borderColor: COLORS.primary,
          borderWidth: 2,
          ...GlobalStyles.whiteCard,
          shadowColor: COLORS.primary, // Mixed shadow
        };
      case 'default':
      default:
        return GlobalStyles.whiteCard;
    }
  };

  const handlePressIn = () => {
    if (onPress) scale.value = getActivePressScale();
  };

  const handlePressOut = () => {
    if (onPress) scale.value = getInactivePressScale();
  };

  const CardView = onPress ? TouchableOpacity : View;

  return (
    <Animated.View style={[animatedStyle, style]}>
      <CardView
        activeOpacity={activeOpacity}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          GlobalStyles.superCard,
          getVariantStyle(),
          { padding }
        ]}
      >
        {children}
      </CardView>
    </Animated.View>
  );
};

export default Card;
