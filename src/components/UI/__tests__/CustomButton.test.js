import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useTheme } from 'react-native-paper';
import CustomButton from '../CustomButton';

jest.mock('react-native-paper', () => ({
    useTheme: jest.fn(),
}));

describe('CustomButton', () => {
    const mockOnPress = jest.fn();
    const mockColors = {
        surface: '#ffffff',
        text: '#000000',
    };

    beforeEach(() => {
        useTheme.mockReturnValue({ colors: mockColors });
    });

    it('renders correctly with text and icon', () => {
        const { getByText, getByTestId } = render(
            <CustomButton onPress={mockOnPress} icon="check" testID="custom-button">
                Click Me
            </CustomButton>
        );

        const button = getByTestId('custom-button');
        expect(button).toBeTruthy();

        const buttonText = getByText('Click Me');
        expect(buttonText).toBeTruthy();

    });

    it('handles onPress event', () => {
        const { getByTestId } = render(
            <CustomButton onPress={mockOnPress} testID="custom-button">
                Click Me
            </CustomButton>
        );

        fireEvent.press(getByTestId('custom-button'));

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
   
    
    
});
