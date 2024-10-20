import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsItem from '../SettingsItem';
import { ThemeProvider } from 'react-native-paper';
import {lightTheme} from '../../themes/lightTheme';

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
            accessibilityLabel="Settings Item"
          />
        </ThemeProvider>
      );
  
      expect(getByText('Settings')).toBeTruthy();
  
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
            accessibilityLabel="Settings Item"
          />
        </ThemeProvider>
      );
  
      fireEvent.press(getByText('Settings'));
  
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
  
      const switchComponent = getByRole('switch');
      fireEvent(switchComponent, 'onValueChange');
  
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
            accessibilityLabel="Settings Item"
          />
        </ThemeProvider>
      );
  
      const switchComponent = getByRole('switch');
      expect(switchComponent.props.value).toBe(false);
  
      rerender(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={true}
            onToggleSwitch={jest.fn()}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" 
          />
        </ThemeProvider>
      );
      expect(getByRole('switch').props.value).toBe(true);
    });
  
    it('does not render a switch when onToggleSwitch is not provided', () => {
      const { queryByRole } = render(
        <ThemeProvider theme={lightTheme}>
          <SettingsItem
            icon="md-settings"
            text="Settings"
            isSwitchOn={false}
            onPress={jest.fn()}
            accessibilityLabel="Settings Item" 
          />
        </ThemeProvider>
      );
  
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
            accessibilityLabel="Settings Item" 
          />
        </ThemeProvider>
      );
  
      expect(getByTestId('settings-icon')).toBeTruthy();
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
              accessibilityLabel="Settings Item"
            />
          </ThemeProvider>
        );

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
            accessibilityLabel="Settings Item"
          />
        </ThemeProvider>
      );
  
      const settingsText = getByText('Settings');
  
      expect(settingsText.props.style).toEqual(
        expect.arrayContaining([{ color: lightTheme.colors.text }]) 
      );
    });
  })