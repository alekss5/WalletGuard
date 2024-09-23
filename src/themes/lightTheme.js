import { DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    accent: '#CDFF34',
    background: '#F2F1F4',
    surface: '#ffffff',
    text: '#000000',
    subtext:'#666666',
    button:'#323232',
    buttonText: '#ffffff',
    error: '#B00020',
    success: '#36B37E',
    shadow:'#e0e0e0',
    elevation: {
      level0: '#ffffff',
      level1: '#f5f5f5',
      level2: '#eeeeee',
      level3: '#e0e0e0',
      level4: '#bdbdbd',
      level5: '#9e9e9e'
    },
  }
};
