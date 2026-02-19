import { Platform } from 'react-native';

// ─── iGo Design Tokens ──────────────────────────────────────────────
export const IGO = {
  // Brand
  cimasBlue: '#003399',
  igoGreen: '#4CAF50',
  accent: '#FF9800',

  // Semantic
  protein: '#AF52DE',
  carbs: '#FF9500',
  fat: '#34C759',
  healthScore: '#007AFF',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#F2F2F7',
  gray300: '#E5E5EA',
  gray400: '#D1D1D6',
  gray500: '#C7C7CC',
  gray600: '#8E8E93',
  gray700: '#636366',
  gray800: '#48484A',
  gray900: '#2C2C2E',
  gray950: '#1C1C1E',

  // Radius
  radiusXs: 8,
  radiusSm: 12,
  radiusMd: 16,
  radiusLg: 20,
  radiusXl: 28,
  radiusFull: 100,

  // Spacing
  space4: 4,
  space6: 6,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space32: 32,

  // Shadows
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  shadowDock: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 12,
  },
} as const;

export const Colors = {
  light: {
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#D1D1D6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceSecondary: '#F2F2F7',
    border: 'rgba(0,0,0,0.03)',
    tint: IGO.cimasBlue,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: '#000000',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#98989E',
    textTertiary: '#48484A',
    background: '#000000',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    border: 'rgba(255,255,255,0.06)',
    tint: '#FFFFFF',
    icon: '#98989E',
    tabIconDefault: '#98989E',
    tabIconSelected: '#FFFFFF',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
