import { DefaultTheme } from '@react-navigation/native';
import { shadow } from 'react-native-paper';

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#121212',
    accent: '#BB86FC', 
    background: '#000000', 
    surface: '#1E1E1E', 
    text: '#FFFFFF', 
    subtext: '#c1c1c1', 
    button: '#666666',
    buttonText: "#FFFFFF",
    error: '#CF6679', 
    success: '#36B37E',
    shadow:"#383838",
    elevation: {
      level0: '#121212',
      level1: '#1e1e1e',
      level2: '#2c2c2c',
      level3: '#383838',
      level4: '#4f4f4f',
      level5: '#666666'
    }
    
    
  },
};
