import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/design';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption';
export type TextColor = 'primary' | 'secondary' | 'inverse' | 'blue' | 'yellow';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  tight?: boolean;
}

const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'body', 
  color = 'primary', 
  tight = false,
  style, 
  ...props 
}) => {
  const getColor = () => {
    switch (color) {
      case 'secondary': return COLORS.text.secondary;
      case 'inverse': return COLORS.text.inverse;
      case 'blue': return COLORS.primary;
      case 'yellow': return COLORS.accent;
      case 'primary':
      default: return COLORS.text.primary;
    }
  };

  const getVariantStyles = () => {
    switch(variant) {
      case 'h1': return styles.h1;
      case 'h2': return styles.h2;
      case 'h3': return styles.h3;
      case 'label': return styles.label;
      case 'caption': return styles.caption;
      case 'body':
      default: return styles.body;
    }
  };

  const tightStyle = tight ? { letterSpacing: TYPOGRAPHY.letterSpacing.tight } : {};

  return (
    <RNText 
      style={[
        styles.base,
        getVariantStyles(),
        { color: getColor() },
        tightStyle,
        style
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  h1: {
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: TYPOGRAPHY.letterSpacing.tighter,
  },
  h2: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    letterSpacing: TYPOGRAPHY.letterSpacing.tight,
  },
  h3: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
  },
  body: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: TYPOGRAPHY.letterSpacing.widest,
  },
  caption: {
    fontSize: 12,
    fontWeight: '600',
  }
});

export default Text;
