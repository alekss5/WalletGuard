import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import SelectCurrency from '../SelectCurrency';
import { setCurrency } from '../../../redux/budgetReducer';
import { lightTheme } from '../../../themes/lightTheme';
import { Alert } from 'react-native';



describe('SelectCurrency Component', () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        mockDispatch.mockClear();
        mockNavigate.mockClear();

        jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    });

    const renderComponent = () => 
        render(
            <PaperProvider theme={lightTheme}>
                <SelectCurrency navigation={{ navigate: mockNavigate }} />
            </PaperProvider>
        );

    it('renders correctly and shows the title', () => {
        const { getByText } = renderComponent();
        expect(getByText('Choose your currency')).toBeTruthy();
    });

    it('filters currencies based on search query', () => {
        const { getByPlaceholderText, getByText } = renderComponent();

        const searchInput = getByPlaceholderText('Search');
        fireEvent.changeText(searchInput, 'BG');

        expect(getByText('BGN - Bulgarian Lev (лв) - Bulgaria')).toBeTruthy();
    });

    it('selects a currency and navigates on continue', () => {
        const { getByText, getByPlaceholderText } = renderComponent();

        const searchInput = getByPlaceholderText('Search');
        fireEvent.changeText(searchInput, 'BG');

        fireEvent.press(getByText('BGN - Bulgarian Lev (лв) - Bulgaria'));

        fireEvent.press(getByText('Continue'));     
        expect(mockDispatch).toHaveBeenCalledWith(setCurrency('лв'));
        expect(mockNavigate).toHaveBeenCalledWith('Salary');
    });

    it('shows alert if no currency is selected on continue', () => {
        const { getByText } = renderComponent();

        fireEvent.press(getByText('Continue'));

        expect(Alert.alert).toHaveBeenCalledWith('Please select your currency.');
    });

});
