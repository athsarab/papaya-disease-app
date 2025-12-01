export type ColorMode = 'light' | 'dark';

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
const radius = { sm: 8, md: 16, lg: 24, pill: 999 } as const;

const lightColors = {
  background: '#F4F9F4',
  surface: '#FFFFFF',
  primary: '#1F8A5D',
  secondary: '#FF914D',
  textPrimary: '#0B2E13',
  textSecondary: '#4A5C52',
  border: '#DCE5D9',
  success: '#24A15A',
  warning: '#E0A100',
  danger: '#D9534F',
  muted: '#9AAE9B',
  overlay: 'rgba(9, 30, 16, 0.4)',
};

const darkColors = {
  background: '#0B1C12',
  surface: '#142419',
  primary: '#4ED28A',
  secondary: '#FFB36B',
  textPrimary: '#F3FFF1',
  textSecondary: '#BFD7BF',
  border: '#2D3A30',
  success: '#59C18E',
  warning: '#FFC857',
  danger: '#FF6B6B',
  muted: '#7E937E',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export interface AppTheme {
  mode: ColorMode;
  colors: typeof lightColors;
  spacing: typeof spacing;
  radius: typeof radius;
  shadow: {
    card: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  radius,
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.05,
      shadowRadius: 16,
      elevation: 4,
    },
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  radius,
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 2,
    },
  },
};

export const getTheme = (mode: ColorMode): AppTheme =>
  mode === 'dark' ? darkTheme : lightTheme;
