import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import Login from '../Login';
import { setPersonalInfo } from '../../../redux/personalInfReducer';
import { Alert } from 'react-native'; 

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.spyOn(Alert, 'alert').mockImplementation(() => {});
describe('Login Component', () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
  
    beforeEach(() => {
      useDispatch.mockReturnValue(mockDispatch);
      mockNavigate.mockClear();
      mockDispatch.mockClear();
      Alert.alert.mockClear(); 
    });

  const setup = () => {
    return render(
      <Login navigation={{ navigate: mockNavigate }} />
    );
  };

  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your age')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });

  test('shows alert if name is empty', () => {
    const { getByText } = setup();
    
    fireEvent.press(getByText('Continue'));

    expect(Alert.alert).toHaveBeenCalledWith('Please enter your name.');
  });

  test('shows alert if age is empty', () => {
    const { getByText, getByPlaceholderText } = setup();

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'John');
    
    
    fireEvent.press(getByText('Continue'));

    expect(Alert.alert).toHaveBeenCalledWith('Please enter your age.');
  });

  test('shows alert if age is invalid', () => {
    const { getByText, getByPlaceholderText } = setup();

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Enter your age'), '-5');
    

    fireEvent.press(getByText('Continue'));

    expect(Alert.alert).toHaveBeenCalledWith('Please enter a valid age.');
  });

  test('dispatches setPersonalInfo and navigates to StartCurrency', () => {
    const { getByText, getByPlaceholderText } = setup();

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Enter your age'), '25');

    fireEvent.press(getByText('Continue'));

    expect(mockDispatch).toHaveBeenCalledWith(setPersonalInfo({ name: 'John', age: 25 }));
    expect(mockNavigate).toHaveBeenCalledWith('StartCurrency');
  });
  
  
});
