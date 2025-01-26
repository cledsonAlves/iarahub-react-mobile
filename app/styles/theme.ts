// styles/theme.ts
export const theme = {
  colors: {
    primary: '#F78C38',
    secondary: '#4a90e2',
    tertiary: '#0066CC',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#B00020',
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#9E9E9E',
      inverse: '#FFFFFF'
    },
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 20,
    round: 1000
  },
  typography: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 'bold'
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: 'bold'
    },
    body1: {
      fontSize: 16,
      lineHeight: 24
    },
    body2: {
      fontSize: 14,
      lineHeight: 20
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600'
    },
    caption: {
      fontSize: 12,
      lineHeight: 16
    }
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 6,
    }
  },
  animation: {
    scale: 1.0,
    timing: {
      quick: 200,
      medium: 300,
      slow: 500
    }
  }
};