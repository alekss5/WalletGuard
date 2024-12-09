import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, AppState } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState,useRef } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

import Splash from './screens/Splash';
import StackNavigation from './navigation/StackNavigation';
import { selectTheme, selectUIState } from './redux/selectors/ui';
import { setLastDateIn } from './redux/uiReducer';
import { requestNotificationPermission } from './notifications/Service';
import { clearNotifications, scheduleDailyBudgetNotification, scheduleDailyNotification, scheduleMonthlyRefreshNotification, scheduleMultipleWeeklyNotifications } from './notifications/Scheduler';
import { isSubscriptionDue, isOneMonthPassed } from './utils/GlobalFunctions';
import { selectIsPassSetup, selectJsonToken, selectSalary } from './redux/selectors/personalInf';
import { selectBudgetState } from './redux/selectors/budget';
import { postLoginUser, putRegisterUser } from './utils/https';
import { setToken } from './redux/personalInfReducer';

export default function Head() {
  const isDarkTheme = useSelector(selectTheme);
  const passTheSetup = useSelector(selectIsPassSetup);
  const salary = useSelector(selectSalary);
  const uiState = useSelector(selectUIState);
  const budgetState = useSelector(selectBudgetState)
  const jestToken = useSelector(selectJsonToken);
  const dispatch = useDispatch();
  const [isSplashActive, setSplashActive] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const initialLoad = useRef(true);

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
    if (uiState.monthlyRefreshNotification) {
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
    // console.log("INITIAL STATE")
    setSplashActive(false)
    const { lastDateIn } = uiState || {};
    const { subscriptionsArray: subscriptions, startDate } = budgetState;

    const lastDateInFormated = lastDateIn.split('T')[0]

    if (isOneMonthPassed(lastDateInFormated, startDate)) {
      Alert.alert("Balance Refreshed", "The total balance has been refreshed!", [{ text: "OK" }]);
      dispatch(resetBudgetData({ salary }));
    }

    checkSubscriptions(subscriptions, lastDateInFormated);
    // dispatch(setLastDateIn());

    await setupNotifications(budgetState);
    setTimeout(() => setSplashActive(true), 1500);
  };

  const handleSignup = async () => {
    try {

      // const user = await putRegisterUser({
      //   name :"aleksandar",
      //   age : '23',
      //   salary : '10000',
      //   jobSector: 'Healthcare',
      //   email : 'aleksandarg305@gmail.com',
      //   password : "5505667Sa",
      // })

      if (jestToken !== '' && jestToken !== undefined) {
        return;
      }
      else {
        const user = await postLoginUser({
          email: 'aleksandarg305@gmail.com',
          password: "5505667Sa",
        })
        //  if (user.status === 201) { //for register
        if (user.status === 200) {
          const token = user.data.token;
          dispatch(setToken(token))

        }
      }
    } catch (error) {
      // console.error(error);
    }

  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      const { lastDateIn } = uiState || {};
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const now = new Date();

        if (lastDateIn) {
          const lastActiveDate = new Date(lastDateIn);
          const timeAwayInSeconds = (now - lastActiveDate) / 1000;
          // console.log(`User was away for ${timeAwayInSeconds} seconds.`);

          if (timeAwayInSeconds > 1800) { //30 min
            loadInitialState();
          }
        }

        dispatch(setLastDateIn());
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    if (initialLoad.current) {
      loadInitialState();
      initialLoad.current = false; 
    }

    return () => {
      subscription.remove();
    };
  }, [appState]);



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
