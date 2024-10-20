import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import CustomText from '../CustomText'; 
import { lightTheme } from '../../../themes/lightTheme'; 


describe('CustomText', () => {
  it('renders with the correct text color from the theme', () => {
    const { getByText } = render(
      <PaperProvider theme={lightTheme}>
        <CustomText>Sample Text</CustomText>
      </PaperProvider>
    );

    const textComponent = getByText('Sample Text');
    
    expect(textComponent.props.style).toEqual(
      expect.arrayContaining([{ color: lightTheme.colors.text }])
    );
  });

  it('applies custom styles in addition to the theme color', () => {
    const customStyle = { fontSize: 20 };

    const { getByText } = render(
      <PaperProvider theme={lightTheme}>
        <CustomText style={customStyle}>Styled Text</CustomText>
      </PaperProvider>
    );

    const textComponent = getByText('Styled Text');
    
    expect(textComponent.props.style).toEqual(
      expect.arrayContaining([{ color: lightTheme.colors.text }, customStyle])
    );
  });
});
