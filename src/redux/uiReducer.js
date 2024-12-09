import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUIStateFromRealm } from "../realm/realmInstance";

const initialState = {
  isDarkTheme: false,
  visibleTotalBalance: false,
  visibleMonthlyBudget: false,
  visibleMonthlyGoal: false,
  visibleExpenseDate:true,
  lastDateIn: '',
  dailyNotification: true,
  overBudgetNotification: true,
  weeklyNotification: true,
  subscriptionNotification: true,
  monthlyRefreshNotification: true,
};

export const fetchUIState = createAsyncThunk('ui/fetchUIState', async () => {
  const uiInfo = await fetchUIStateFromRealm();
  return uiInfo || initialState;
});

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.isDarkTheme = action.payload === 'dark';
    },
    toggleNotification: (state, action) => {
      const { notificationType } = action.payload;
      switch (notificationType) {
        case 'dailyNotification':
          state.dailyNotification = !state.dailyNotification;
          break;
        case 'overBudgetNotification':
          state.overBudgetNotification = !state.overBudgetNotification;
          break;
        case 'weeklyNotification':
          state.weeklyNotification = !state.weeklyNotification;
          break;
        case 'subscriptions':
          state.subscriptionNotification = !state.subscriptionNotification;
          break;
        case 'monthlyRefresh':
          state.monthlyRefreshNotification = !state.monthlyRefreshNotification;
          break;
        default:
          break;
      }
    },
    toggleHomeScreenVisibility: (state, action) => {
      const { element } = action.payload;
      switch (element) {
        case 'totalBalance':
          state.visibleTotalBalance = !state.visibleTotalBalance;
          break;
        case 'monthlyBudget':
          state.visibleMonthlyBudget = !state.visibleMonthlyBudget;
          break;
        case 'monthlyGoal':
          state.visibleMonthlyGoal = !state.visibleMonthlyGoal;
          break;
        default:
          break;
      }
    },
    setLastDateIn: (state) => {
      state.lastDateIn = new Date().toISOString();
    },
    initializeUIState: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUIState.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


export const {
  toggleTheme,
  toggleHomeScreenVisibility,
  toggleNotification,
  setLastDateIn,
  initializeUIState,
} = uiSlice.actions;

export default uiSlice.reducer;
