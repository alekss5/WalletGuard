import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; // Adjust path to your component
import { useSelector } from 'react-redux';
import { lightVibration } from '../../utils/vibrationPaterns';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
  }));
  
  jest.mock('react-native-chart-kit', () => ({
    PieChart: () => null,
  }));
  
  describe('HomeScreen Component', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => {
        switch (selector) {
          case selectBudgetData:
            return { total: 1000, expense: 200, income: 1200, currency: 'USD', budget: 1500 };
          case selectName:
            return 'John Doe';
          default:
            return null;
        }
      });
    });
  
    it('renders correctly with expenses and displays the correct name', () => {
      // const mockNavigation = { navigate: jest.fn() };
      // const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
      
      // expect(getByText('Hello,')).toBeTruthy();
    });
  
  });