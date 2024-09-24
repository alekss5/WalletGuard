import { getRealmInstance } from './realmConfig';
import Realm from 'realm';

const realm = getRealmInstance();

const mapSubscription = (subscription) => ({
  day: subscription.day,
  type: { ...subscription.type },
  amount: subscription.amount,
  lastProcessedDate: subscription.lastProcessedDate,
});

const mapExpenseOrIncome = (item) => ({
  amount: item.amount,
  category: { ...item.category },
  date: item.date,
});

export const fetchBudgetDataFromRealm = () => {
  const budgetData = realm.objectForPrimaryKey("Budget", "budgetState");
  if (!budgetData) return null;

  return {
    total: budgetData.total,
    expense: budgetData.expense,
    income: budgetData.income,
    startDate: budgetData.startDate,
    currency: budgetData.currency,
    subscriptionsArray: budgetData.subscriptionsArray.map(mapSubscription),
    expensesArray: budgetData.expensesArray.map(mapExpenseOrIncome),
    incomeArray: budgetData.incomeArray.map(mapExpenseOrIncome),
    budget: budgetData.budget,
  };
};

export const saveBudgetDataToRealm = (budgetState) => {
  try {
    realm.write(() => {
      realm.create("Budget", { _id: "budgetState", ...budgetState }, Realm.UpdateMode.Modified);
    });
  } catch (error) {
    console.error("Error saving Budget data to Realm: ", error);
  }
};
