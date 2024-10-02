import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

import Splash from './screens/Splash';
import StackNavigation from './navigation/StackNavigation';
import { selectTheme,selectUIState } from './redux/selectors/ui';
import { setLastDateIn } from './redux/uiReducer';
import { requestNotificationPermission } from './notifications/Service';
import { clearNotifications, scheduleDailyBudgetNotification, scheduleDailyNotification, scheduleMonthlyNotification, scheduleMonthlyRefreshNotification, scheduleMultipleWeeklyNotifications } from './notifications/Scheduler';
import { isSubscriptionDue, isOneMonthPassed } from './utils/GlobalFunctions';
import { selectIsPassSetup,selectSalary } from './redux/selectors/personalInf';
import { selectBudgetState } from './redux/selectors/budget';

export default function Head() {
  const isDarkTheme = useSelector(selectTheme);
  const passTheSetup = useSelector(selectIsPassSetup);
  const salary = useSelector(selectSalary);
  const uiState = useSelector(selectUIState);
  const budgetState  = useSelector(selectBudgetState)
  
  const dispatch = useDispatch();
  const [isSplashActive, setSplashActive] = useState(false);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  let statusBarColor = isDarkTheme ? 'light' : 'dark';

  const setupNotifications = async (budgetData) => {
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) return;
    const { budget, total, startDate } = budgetData;
    clearNotifications();

    if (uiState.overBudgetNotification && budget > total) {
      scheduleDailyBudgetNotification();
    }
    if (uiState.dailyNotification) {
      scheduleDailyNotification();
    }
    if (uiState.weeklyNotification) {
      scheduleMultipleWeeklyNotifications();
    }
    if(uiState.monthlyRefreshNotification){
      scheduleMonthlyRefreshNotification(startDate)
    }
  };

  function addSubscriptionAsExpense(subscription) {
    const formattedDate = new Date().toISOString().split('T')[0];
    dispatch(addExpense({
      amount: subscription.amount,
      category: subscription.type,
      date: formattedDate,
    }));
    dispatch(updateSubscriptionDate({
      day: subscription.day,
      typeDescription: subscription.type.description,
      date: formattedDate,
    }));
  }

  function checkSubscriptions(subscriptions, lastLogin) {
    subscriptions?.forEach(subscription => {
      if (isSubscriptionDue(subscription, lastLogin)) {
        addSubscriptionAsExpense(subscription);
      }
    });
  }

  const loadInitialState = async () => {
    const { lastDateIn } = uiState || {};
    const { subscriptionsArray: subscriptions, startDate } = budgetState ;


    if (isOneMonthPassed(lastDateIn, startDate)) {
      Alert.alert("Balance Refreshed", "The total balance has been refreshed!", [{ text: "OK" }]);
      dispatch(resetBudgetData({ salary }));
    }

    checkSubscriptions(subscriptions, lastDateIn);
    dispatch(setLastDateIn());

    await setupNotifications(budgetState);
  };

  useEffect(() => {
    loadInitialState();
    setTimeout(() => setSplashActive(true), 1500); // Show splash for 1.5 seconds
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={statusBarColor} />
      {!isSplashActive ? (
        <Splash />
      ) : (
        <PaperProvider theme={theme}>
          <Animated.View entering={FadeIn} style={{ flex: 1 }}>
            <StackNavigation isUser={passTheSetup} />
          </Animated.View>
        </PaperProvider>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666666'
  },
});
