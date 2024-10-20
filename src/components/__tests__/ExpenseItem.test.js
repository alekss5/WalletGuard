import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ExpenseItem from '../ExpenseItem';
import { ThemeProvider } from 'react-native-paper';

const mockOnDelete = jest.fn();

const theme = {
  colors: {
    text: '#000',
    subtext: '#666',
  }
};

describe('ExpenseItem Component', () => {

  it('renders the ExpenseItem component correctly with all props', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ExpenseItem
          date="2024-09-30"
          title={{ description: 'Shopping', icon: 'shopping' }}
          currency="USD"
          amount="100.00"
          onDelete={mockOnDelete}
          dayNumber="30"
        />
      </ThemeProvider>
    );

    expect(getByText('Shopping')).toBeTruthy();

    expect(getByText('2024-09-30')).toBeTruthy();

    expect(getByText('USD')).toBeTruthy();
    expect(getByText('100.00')).toBeTruthy();

    const deleteButton = getByTestId('delete-button');
    expect(deleteButton).toBeTruthy();

    fireEvent.press(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
  });

  it('renders the component without the delete button when onDelete is not provided', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ExpenseItem
          date="2024-09-30"
          title={{ description: 'Shopping', icon: 'shopping' }}
          currency="USD"
          amount="100.00"
          dayNumber="30"
        />
      </ThemeProvider>
    );

    expect(queryByTestId('delete-button')).toBeNull();
  });

  it('does not render dayNumber when it is not provided', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <ExpenseItem
          title={{ description: 'Shopping', icon: 'shopping' }}
          currency="USD"
          amount="100.00"
        />
      </ThemeProvider>
    );
    
    expect(queryByText('30')).toBeNull();
  });

  it('does not render date when it is not provided', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <ExpenseItem
          title={{ description: 'Shopping', icon: 'shopping' }}
          currency="USD"
          amount="100.00"
          dayNumber="30"
        />
      </ThemeProvider>
    );
    
    expect(queryByText('2024-09-30')).toBeNull();
  });

  it('renders the correct icon based on the title', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ExpenseItem
          title={{ description: 'Shopping', icon: 'shopping' }}
          currency="USD"
          amount="100.00"
        />
      </ThemeProvider>
    );
  
    const icon = getByTestId('expense-icon');
    expect(icon).toBeTruthy();
  });
  
  it('matches the snapshot', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ExpenseItem
          date="2024-09-30"
          title={{ description: 'Shopping', icon: 'shopping' }}
          currency="USD"
          amount="100.00"
          onDelete={mockOnDelete}
          dayNumber="30"
        />
      </ThemeProvider>
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
