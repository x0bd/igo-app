import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { getActivePressScale, getInactivePressScale } from '../../utils/styles';
import { COLORS, RADIUS } from '../../constants/design';
import Text from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (!disabled && !loading) scale.value = getActivePressScale();
  };

  const handlePressOut = () => {
    if (!disabled && !loading) scale.value = getInactivePressScale();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const getBackgroundColor = () => {
    if (disabled) return '#E5E7EB';
    switch (variant) {
      case 'primary': return COLORS.primary;
      case 'secondary': return COLORS.background;
      case 'accent': return COLORS.accent;
      case 'ghost': return 'transparent';
      default: return COLORS.primary;
    }
  };

  const getTextColor = (): 'inverse' | 'primary' | 'blue' => {
    if (disabled) return 'secondary';
    switch (variant) {
      case 'primary': return 'inverse';
      case 'secondary': return 'primary';
      case 'accent': return 'primary';
      case 'ghost': return 'primary';
      default: return 'inverse';
    }
  };

  return (
    <Animated.View style={[animatedStyle, fullWidth && { width: '100%' }, style]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={{
          backgroundColor: getBackgroundColor(),
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: RADIUS.full,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: variant === 'secondary' ? 2 : 0,
          borderColor: variant === 'secondary' ? '#F3F4F6' : 'transparent',
          shadowColor: variant === 'primary' ? COLORS.primary : variant === 'accent' ? COLORS.accent : '#000',
          shadowOffset: { width: 0, height: variant !== 'ghost' && variant !== 'secondary' && !disabled ? 8 : 0 },
          shadowOpacity: variant !== 'ghost' && variant !== 'secondary' && !disabled ? 0.3 : 0,
          shadowRadius: 12,
          elevation: variant !== 'ghost' && variant !== 'secondary' && !disabled ? 8 : 0,
        }}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? COLORS.background : COLORS.primary} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon} 
                size={20} 
                color={getTextColor() === 'inverse' ? COLORS.background : COLORS.text.primary} 
                style={{ marginRight: 8 }} 
              />
            )}
            <Text variant="h3" color={getTextColor()} style={{ fontSize: 16 }}>
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
