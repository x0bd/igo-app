// Theme related types

export type ColorToken = 
  | 'cimas-blue'
  | 'cimas-yellow'
  | 'cimas-white'
  | 'cimas-off-white'
  | 'protein'
  | 'carbs'
  | 'fat'
  | 'health-score';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  error: string;
}

export type BorderRadiusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface BoxShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number;
}
