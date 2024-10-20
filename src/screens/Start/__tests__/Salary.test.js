import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import Salary from '../Salary';
import { setJobInformation } from '../../../redux/personalInfReducer';
import { setTotal } from '../../../redux/budgetReducer';
import { Alert } from 'react-native';

describe('Salary Component', () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        mockDispatch.mockClear();
        mockNavigate.mockClear();
        jest.spyOn(Alert, 'alert').mockImplementation(() => { });
    });

    const setup = () => {
        return render(
            <Salary navigation={{ navigate: mockNavigate }} />
        );
    };

    test('renders correctly', () => {
        const { getByPlaceholderText, getByText } = setup();

        expect(getByPlaceholderText('Enter your salary')).toBeTruthy();
        expect(getByText('Continue')).toBeTruthy();
    });

    test('shows alert if salary is empty', () => {
        const { getByText } = setup();

        fireEvent.press(getByText('Continue'));

        expect(Alert.alert).toHaveBeenCalledWith('Please enter your monthly income.');
    });

    test('shows alert if salary is invalid', () => {
        const { getByText, getByPlaceholderText } = setup();

        fireEvent.changeText(getByPlaceholderText('Enter your salary'), '0');

        fireEvent.press(getByText('Continue'));

        expect(Alert.alert).toHaveBeenCalledWith('Please enter your real salary.');
    });

    test('shows alert if job sector is not selected', () => {
        const { getByText, getByPlaceholderText } = setup();

        fireEvent.changeText(getByPlaceholderText('Enter your salary'), '5000');

        fireEvent.press(getByText('Continue'));

        expect(Alert.alert).toHaveBeenCalledWith('Please select your job sector.');
    });

    test('dispatches setTotal and setJobInformation, then navigates', () => {
        const { getByText, getByPlaceholderText, getByTestId } = setup();

        fireEvent.changeText(getByPlaceholderText('Enter your salary'), '5000');
        fireEvent(getByTestId('jobSectorPicker'), 'onValueChange', 'Engineering');

        fireEvent.press(getByText('Continue'));

        expect(mockDispatch).toHaveBeenCalledWith(setTotal({ salary: '5000' }));
        expect(mockDispatch).toHaveBeenCalledWith(setJobInformation({ salary: 5000, jobSector: 'Engineering' }));
        expect(mockNavigate).toHaveBeenCalledWith('BottomTabs');
    });
});
