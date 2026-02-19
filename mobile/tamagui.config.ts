import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

// Cimas iGo Design Tokens
const cimasColors = {
  cimasBlue: '#003399',
  igoGreen: '#4CAF50',
  accentOrange: '#FF9800',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
}

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      background: cimasColors.white,
      backgroundHover: cimasColors.gray[50],
      backgroundPress: cimasColors.gray[100],
      backgroundFocus: cimasColors.gray[100],
      borderColor: cimasColors.gray[200],
      borderColorHover: cimasColors.gray[300],
      color: cimasColors.black,
      colorHover: cimasColors.gray[900],
      colorPress: cimasColors.gray[800],
      colorFocus: cimasColors.gray[800],
      placeholderColor: cimasColors.gray[500],
      // Cimas Brand Colors
      primary: cimasColors.cimasBlue,
      primaryHover: '#002266',
      primaryPress: '#001133',
      secondary: cimasColors.igoGreen,
      secondaryHover: '#45A049',
      secondaryPress: '#3D8B40',
      accent: cimasColors.accentOrange,
      accentHover: '#FB8C00',
      accentPress: '#F57C00',
    },
  },
  tokens: {
    ...config.tokens,
    color: {
      ...config.tokens.color,
      cimasBlue: cimasColors.cimasBlue,
      igoGreen: cimasColors.igoGreen,
      accentOrange: cimasColors.accentOrange,
    },
    radius: {
      ...config.tokens.radius,
      true: 16,
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
    },
  },
  animations: {
    ...config.animations,
    bouncy: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
    quick: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
  },
})

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig


