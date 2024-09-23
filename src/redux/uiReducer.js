import { createSlice } from "@reduxjs/toolkit";
import { fetchUIStateFromRealm, saveUIStateToRealm } from "../realm/realmInstance";

const initialState = {
  isDarkTheme: false,
  visibleTotalBalance: false,
  visibleMonthlyBudget: false,
  visibleMonthlyGoal: false,
  lastDateIn: '',
  dailyNotification: true,
  overBudgetNotification: true,
  weeklyNotification: true,
  subscriptionNotification: true,
  monthlyRefreshNotification: true,
}
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      if (action.payload === 'dark') {
        state.isDarkTheme = false;
      } else {
        state.isDarkTheme = true;
      }
      saveUIStateToRealm(state)
    },
    toggleNotification: (state, action) => {
      const { notificationType } = action.payload;
      if (notificationType === 'dailyNotification') {
        state.dailyNotification = !state.dailyNotification;
      } else if (notificationType === 'overBudgetNotification') {
        state.overBudgetNotification = !state.overBudgetNotification;
      } else if (notificationType === 'weeklyNotification') {
        state.weeklyNotification = !state.weeklyNotification;
      }else if (notificationType === 'subscriptions') {
        state.subscriptionNotification = !state.subscriptionNotification;
      } else if (notificationType === 'monthlyRefresh') {
        state.subscriptionNotification = !state.monthlyRefreshNotification;
      } 
      saveUIStateToRealm(state);
    },
    toggleHomeScreenVisibility: (state, action) => {
      const { element } = action.payload;
      if (element === 'totalBalance') {
        state.visibleTotalBalance = !state.visibleTotalBalance;
      } else if (element === 'monthlyBudget') {
        state.visibleMonthlyBudget = !state.visibleMonthlyBudget;
      } else if (element === 'monthlyGoal') {
        state.visibleMonthlyGoal = !state.visibleMonthlyGoal;
      }
      saveUIStateToRealm(state);
    },
    setLastDateIn: (state) => {
      state.lastDateIn = new Date().toISOString().split('T')[0];
      saveUIStateToRealm(state);
    },
    initializeUIState: (state, action) => {
      return action.payload;
    }
  },
});
export const initializeUIFromRealm = () => (dispatch) => {
  const uilInfo = fetchUIStateFromRealm();
  if (uilInfo) {
    dispatch(initializeUIState(uilInfo));
  } else {
    saveUIStateToRealm(initialState);
    dispatch(initializeUIState(initialState));
  }
};

export const selectTheme = (state) => state.ui.isDarkTheme;
export const selectVisibleTotalBalance = (state) => state.ui.visibleTotalBalance;
export const selectVisibleMonthlyBudget = (state) => state.ui.visibleMonthlyBudget;
export const selectVisibleMonthlyGoal = (state) => state.ui.visibleMonthlyGoal;

export const selectDailyNotification = (state) => state.ui.dailyNotification;
export const selectOverBudgetNotification = (state) => state.ui.overBudgetNotification;
export const selectWeeklyNotification = (state) => state.ui.weeklyNotification;
export const selectSubscNotification = (state) => state.ui.subscriptionNotification;
export const selectMonthlyRefreshNotification = (state) => state.ui.monthlyRefreshNotification;


export const { toggleTheme, toggleHomeScreenVisibility, toggleNotification,setLastDateIn, initializeUIState } = uiSlice.actions;
export default uiSlice.reducer;

