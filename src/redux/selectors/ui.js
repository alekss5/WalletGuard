export const selectTheme = (state) => state.ui.isDarkTheme;
export const selectVisibleTotalBalance = (state) => state.ui.visibleTotalBalance;
export const selectVisibleMonthlyBudget = (state) => state.ui.visibleMonthlyBudget;
export const selectVisibleMonthlyGoal = (state) => state.ui.visibleMonthlyGoal;
export const selectVisibleDecimals = (state) => state.ui.visibleDecimal;
export const selectDailyNotification = (state) => state.ui.dailyNotification;
export const selectOverBudgetNotification = (state) => state.ui.overBudgetNotification;
export const selectWeeklyNotification = (state) => state.ui.weeklyNotification;
export const selectSubscNotification = (state) => state.ui.subscriptionNotification;
export const selectMonthlyRefreshNotification = (state) => state.ui.monthlyRefreshNotification;
export const selectUIState = (state) => state.ui;

export const selectDoneAnimation = (state) => state.uiNoRealm.showDoneAnimation;