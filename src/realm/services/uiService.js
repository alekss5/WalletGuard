import { getRealmInstance } from './realmConfig';
import Realm from 'realm';

const realm = getRealmInstance();

export const fetchUIStateFromRealm = () => {
  const uiData = realm.objectForPrimaryKey("UI", "uiState");
  if (!uiData) return null;

  return {
    isDarkTheme: uiData.isDarkTheme,
    visibleTotalBalance: uiData.visibleTotalBalance,
    visibleMonthlyBudget: uiData.visibleMonthlyBudget,
    visibleMonthlyGoal: uiData.visibleMonthlyGoal,
    visibleExpenseDate:uiData.visibleExpenseDate,
    visibleDecimal:uiData.visibleDecimal, //the new field 
    lastDateIn: uiData.lastDateIn,
    dailyNotification: uiData.dailyNotification,
    overBudgetNotification: uiData.overBudgetNotification,
    weeklyNotification: uiData.weeklyNotification,
    subscriptionNotification: uiData.subscriptionNotification,
    monthlyRefreshNotification: uiData.monthlyRefreshNotification,
  };
};

export const saveUIStateToRealm = (uiState) => {
  try {
    realm.write(() => {
      realm.create("UI", { _id: "uiState", ...uiState }, Realm.UpdateMode.Modified);
    });
  } catch (error) {
    console.error("Error saving UI state to Realm: ", error);
  }
};
