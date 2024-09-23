import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';

import { useDispatch, useSelector } from 'react-redux';
import { initializeUIFromRealm, initializeUIState, selectTheme, setLastDateIn } from './redux/uiReducer';
import StackNavigation from './navigation/StackNavigation';
import { useEffect, useState } from 'react';
import Animated, { FadeIn } from "react-native-reanimated";
import Splash from './screens/Splash';
import { fetchBudgetDataFromRealm, fetchUIStateFromRealm } from './realm/realmInstance';
import { initializePersonalInfoFromRealm, selectIsPassSetup, selectSalary } from './redux/personalInfReducer';
import { addExpense, initializeBudgetFromRealm, resetBudgetData, updateSubscriptionDate } from './redux/budgetReducer';
import { requestNotificationPermission } from './notifications/Service';
import { clearNotifications, scheduleDailyBudgetNotification, scheduleDailyNotification, scheduleMultipleWeeklyNotifications } from './notifications/Scheduler';
import { isSubscriptionDue,isOneMonthPassed } from './utils/GlobalFunctions';
export default function Head() {
  const isDarkTheme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const passTheSetup = useSelector(selectIsPassSetup)
  const salary = useSelector(selectSalary)
  const [isSplashActive, setSplashActive] = useState(false);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  let statusBarColor = isDarkTheme ? "light" : "dark";

  const setupNotifications = async (uiState, budgetData) => {
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) return;

    const { budget, total } = budgetData;
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
  };

  function addSubscriptionAsExpense(subscription) {
    const formattedDate = new Date().toISOString().split('T')[0];
    dispatch(addExpense({
      amount: subscription.amount,
      category: subscription.type,
      date: formattedDate,
    }));
    dispatch(updateSubscriptionDate({day:subscription.day,typeDescription:subscription.type.description,date:formattedDate}))

  }

  function checkSubscriptions(subscriptions, lastLogin) {
    subscriptions?.forEach(subscription => {
      
      if (isSubscriptionDue(subscription, lastLogin)) {
        addSubscriptionAsExpense(subscription);
      }
    });
  }

  const loadInitialState = async () => {
    const uiStateFromRealm = await fetchUIStateFromRealm();
    const budgetData = await fetchBudgetDataFromRealm();

    const subscriptions = budgetData?.subscriptionsArray
    const lastDateIn = uiStateFromRealm?.lastDateIn;
    const startDate = budgetData?.startDate

    if (uiStateFromRealm) {
      dispatch(initializeUIState(uiStateFromRealm));
    } else {
      dispatch(initializeUIFromRealm(uiStateFromRealm));
    }

    dispatch(initializePersonalInfoFromRealm());
    dispatch(initializeBudgetFromRealm(budgetData));

    if (isOneMonthPassed(lastDateIn, startDate) === true) {
      Alert.alert(
        "Balance Refreshed",
        "The total balance has been refreshed!",
        [{ text: "OK" }]
      );
      dispatch(resetBudgetData({ salary }))
    }

    checkSubscriptions(subscriptions, lastDateIn);

    dispatch(setLastDateIn())
    await setupNotifications(uiStateFromRealm, budgetData);
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
