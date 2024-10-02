import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsItem from '../SettingsItem';
import { ThemeProvider } from 'react-native-paper';
import {lightTheme} from '../../themes/lightTheme'; // adjust this based on your project

describe('SettingsItem Component', () => {
    it('renders correctly with all props', () => {
      const { getByText, getByTestId } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onToggleSwitch={jest.fn()}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      // Check if the text is rendered
      expect(getByText('Settings')).toBeTruthy();
  
      // Check if the icon is rendered (using the testID for Ionicons)
      expect(getByTestId('settings-icon')).toBeTruthy();
    });
  
    it('calls onPress when the item is pressed', () => {
      const onPressMock = jest.fn();
  
      const { getByText } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onToggleSwitch={jest.fn()}
            onPress={onPressMock}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      // Simulate a press on the Pressable component
      fireEvent.press(getByText('Settings'));
  
      // Check if onPress was called
      expect(onPressMock).toHaveBeenCalled();
    });
  
    it('toggles the switch when the onToggleSwitch is called', () => {
      const onToggleSwitchMock = jest.fn();
  
      const { getByRole } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={true}
            onToggleSwitch={onToggleSwitchMock}
            onPress={jest.fn()}
          />
        </ThemeProvider>
      );
  
      // Simulate a toggle of the Switch component
      const switchComponent = getByRole('switch');
      fireEvent(switchComponent, 'onValueChange');
  
      // Check if onToggleSwitch was called
      expect(onToggleSwitchMock).toHaveBeenCalled();
    });
  
    it('displays the switch in the correct state based on isSwitchOn prop', () => {
      const { getByRole, rerender } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onToggleSwitch={jest.fn()}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      // Check if the switch is off initially
      const switchComponent = getByRole('switch');
      expect(switchComponent.props.value).toBe(false); // Check the value directly
  
      // Re-render with switch on
      rerender(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={true}
            onToggleSwitch={jest.fn()}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      // Check if the switch is on
      expect(getByRole('switch').props.value).toBe(true); // Check the value directly
    });
  
    it('does not render a switch when onToggleSwitch is not provided', () => {
      const { queryByRole } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      // Check that the switch is not rendered
      expect(queryByRole('switch')).toBeNull();
    });
  
    it('renders the icon correctly', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onToggleSwitch={jest.fn()}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      // Check if the icon is rendered
      expect(getByTestId('settings-icon')).toBeTruthy(); // Ensure to assign a testID in the SettingsItem component for the icon
    });
    
    it('has the correct accessibility label', () => {
        const { getByLabelText } = render(
          <ThemeProvider theme={lightTheme}>
            <SettingsItem
              icon="md-settings"
              text="Settings"
              isSwitchOn={false}
              onToggleSwitch={jest.fn()}
              onPress={jest.fn()}
              accessibilityLabel="Settings Item" // Ensure this is set in the component
            />
          </ThemeProvider>
        );
      
        // Check if the accessibility label is correctly set
        expect(getByLabelText('Settings Item')).toBeTruthy();
      });
      
  
    it('applies the correct styles', () => {
      const { getByText } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onToggleSwitch={jest.fn()}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" // Add accessibilityLabel here
          />
        </ThemeProvider>
      );
  
      const settingsText = getByText('Settings');
  
      // Check if the text has the expected styles
      expect(settingsText.props.style).toEqual(
        expect.arrayContaining([{ color: lightTheme.colors.text }]) // Check if the text color is correct
      );
    });
  });