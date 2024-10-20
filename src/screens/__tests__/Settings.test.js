import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Settings from '../Settings';
import { lightVibration } from '../../utils/vibrationPaterns';

// Mock navigation and vibration
const mockNavigate = jest.fn();
jest.mock('../../utils/vibrationPaterns', () => ({
  lightVibration: jest.fn(),
}));

describe('Settings Component', () => {
  const navigation = { navigate: mockNavigate };

  it('renders correctly', () => {
    const { toJSON } = render(<Settings navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('navigates to correct routes when buttons are pressed', () => {
    const { getByText } = render(<Settings navigation={navigation} />);

    fireEvent.press(getByText('Upgrade to premium'));
    expect(mockNavigate).toHaveBeenCalledWith('CommingSoon');
    expect(lightVibration).toHaveBeenCalled();

    fireEvent.press(getByText('Personal Information'));
    expect(mockNavigate).toHaveBeenCalledWith('PersonalInformation');
    expect(lightVibration).toHaveBeenCalled();

  });
});
