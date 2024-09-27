import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import SettingsItem from '../../components/SettingsItem';
import {
  toggleNotification
} from '../../redux/uiReducer';
import { selectDailyNotification,
  selectOverBudgetNotification,
  selectWeeklyNotification,
  selectSubscNotification,
  selectMonthlyRefreshNotification, } from '../../redux/selectors/ui';

export default function Notifications() {
  const dispatch = useDispatch();

  const dailyNotification = useSelector(selectDailyNotification);
  const overBudgetNotification = useSelector(selectOverBudgetNotification);
  const weeklyNotification = useSelector(selectWeeklyNotification);
  const subscNotification = useSelector(selectSubscNotification);
  const monthlyRefreshNotification = useSelector(selectMonthlyRefreshNotification);

  const handleToggle = (notificationType) => {
    dispatch(toggleNotification({ notificationType }));
  };

  return (
    <BackgroundColorContainer>
      <View style={{ width: '90%', alignSelf: 'center', paddingTop: 10 }}>
        <SettingsItem
          text="Daily Notifications"
          icon="notifications-circle"
          isSwitchOn={dailyNotification}
          onToggleSwitch={() => handleToggle('dailyNotification')}
        />
        <SettingsItem
          text="Over Budget"
          icon="trending-down"
          isSwitchOn={overBudgetNotification}
          onToggleSwitch={() => handleToggle('overBudgetNotification')}
        />
        <SettingsItem
          text="Weekly Notifications"
          icon="calendar-sharp"
          isSwitchOn={weeklyNotification}
          onToggleSwitch={() => handleToggle('weeklyNotification')}
        />
        <SettingsItem
          text="Subscriptions"
          icon="calendar-number-outline"
          isSwitchOn={subscNotification}
          onToggleSwitch={() => handleToggle('subscriptions')}
        />
        <SettingsItem
          text="Monthly refresh"
          icon="refresh"
          isSwitchOn={monthlyRefreshNotification}
          onToggleSwitch={() => handleToggle('monthlyRefresh')}
        />
      </View>
    </BackgroundColorContainer>
  );
}

const styles = StyleSheet.create({});
