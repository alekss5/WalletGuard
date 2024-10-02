import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useTheme } from 'react-native-paper';
import CustomButton from '../CustomButton';

// Mock the useTheme hook from react-native-paper
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
        // Reset the mock implementation before each test
        useTheme.mockReturnValue({ colors: mockColors });
    });

    it('renders correctly with text and icon', () => {
        const { getByText, getByTestId } = render(
            <CustomButton onPress={mockOnPress} icon="check" testID="custom-button">
                Click Me
            </CustomButton>
        );

        // Check if the button is rendered
        const button = getByTestId('custom-button');
        expect(button).toBeTruthy();

        // Check if the text is rendered
        const buttonText = getByText('Click Me');
        expect(buttonText).toBeTruthy();

        // Check if the icon is rendered (You can further check the icon component if needed)
    });

    it('handles onPress event', () => {
        const { getByTestId } = render(
            <CustomButton onPress={mockOnPress} testID="custom-button">
                Click Me
            </CustomButton>
        );

        // Trigger the button press
        fireEvent.press(getByTestId('custom-button'));

        // Assert that the onPress function was called
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
   
    
    
});
