/**
 * Theme and design token types
 */

export interface ColorPalette {
  'cimas-blue': string;
  'cimas-yellow': string;
  'cimas-white': string;
  'cimas-off-white': string;
  protein: string;
  carbs: string;
  fat: string;
  'health-score': string;
}

export interface ShadowPreset {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number; // For Android
}

export interface DepthShadow {
  blue: ShadowPreset;
  yellow: ShadowPreset;
  navIsland: ShadowPreset;
  whiteCard: ShadowPreset;
}

export interface TypographyScale {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700' | '800' | '900';
  letterSpacing?: number;
  lineHeight?: number;
}

export interface Theme {
  colors: ColorPalette;
  shadows: DepthShadow;
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    full: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  typography: {
    heading: TypographyScale;
    subheading: TypographyScale;
    body: TypographyScale;
    caption: TypographyScale;
    label: TypographyScale;
  };
}

