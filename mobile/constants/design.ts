import { Platform } from 'react-native';

export const COLORS = {
  primary: '#003399',      // Cimas Blue
  accent: '#FFD600',       // Cimas Yellow
  background: '#FFFFFF',   // Cimas White
  surface: '#F8F9FA',      // Cimas Off-White
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    inverse: '#FFFFFF',
  }
};

export const SHADOWS = {
  depthBlue: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    ...Platform.select({ android: { elevation: 15 } }),
  },
  depthYellow: {
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    ...Platform.select({ android: { elevation: 15 } }),
  },
  navIsland: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    ...Platform.select({ android: { elevation: 20 } }),
  },
  whiteCard: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    ...Platform.select({ android: { elevation: 2 } }),
  }
};

export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  '2xl': 32,
  '3xl': 40,    // Super cards
  full: 9999,
};

export const TYPOGRAPHY = {
  fontFamily: 'PlusJakartaSans',
  letterSpacing: {
    tight: -1,
    tighter: -2,
    widest: 2,
  }
};

export const ANIMATION = {
  spring: {
    damping: 15,
    stiffness: 300,
  }
};
