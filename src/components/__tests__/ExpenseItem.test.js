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

  // Renders component with all props
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

    // Verify the title is displayed
    expect(getByText('Shopping')).toBeTruthy();

    // Verify the date is displayed
    expect(getByText('2024-09-30')).toBeTruthy();

    // Verify the currency and amount are displayed
    expect(getByText('USD')).toBeTruthy();
    expect(getByText('100.00')).toBeTruthy();

    // Find the delete button by testID
    const deleteButton = getByTestId('delete-button');
    expect(deleteButton).toBeTruthy();

    // Test delete button click
    fireEvent.press(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
  });

  // Renders without the delete button when onDelete is not provided
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

    // The delete button should not be rendered when onDelete is not provided
    expect(queryByTestId('delete-button')).toBeNull();
  });

  // Test conditional rendering of dayNumber
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
    
    // dayNumber should not be rendered
    expect(queryByText('30')).toBeNull();
  });

  // Test conditional rendering of date
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
    
    // date should not be rendered
    expect(queryByText('2024-09-30')).toBeNull();
  });

  // Test icon rendering based on the title
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
  
    // Query by testID
    const icon = getByTestId('expense-icon');
    expect(icon).toBeTruthy(); // Check if the image exists
  });
  

  // Snapshot test
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
