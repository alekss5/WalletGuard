import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { fetchBudgetDataFromRealm, saveBudgetDataToRealm } from "../realm/realmInstance";

const initialState = {
  total: 0,
  expense: 0,
  income: 0,
  startDate: 1,
  currency: null,
  subscriptionsArray: [],
  expensesArray: [],
  incomeArray: [],
  budget: 0,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const { amount, category, date } = action.payload;
      state.expense += Number(amount);
      state.total -= Number(amount);
      state.expensesArray.push({ amount, category, date: date });
      saveBudgetDataToRealm(state)
    },
    deleteExpense: (state, action) => {
      const { amount, category, date } = action.payload;
      const normalizedAmount = Number(amount);

      const expenseIndex = state.expensesArray.findIndex(
        (expense) =>
          Number(expense.amount) === normalizedAmount &&
          expense.category.id === category.id &&
          expense.date === date
      );

      if (expenseIndex !== -1) {
        state.expense -= normalizedAmount;
        state.total += normalizedAmount;
        state.expensesArray.splice(expenseIndex, 1);
        saveBudgetDataToRealm(state);
      }
    },
    setTotal: (state, action) => {
      const { salary } = action.payload;
      state.total = Number(salary)
      saveBudgetDataToRealm(state);
    },
    addIncome: (state, action) => {
      const { amount, category, date } = action.payload;
      state.income += Number(amount);
      state.total += Number(amount);
      state.incomeArray.push({ amount, category, date: date });
      saveBudgetDataToRealm(state)
    },
    addSubscription: (state, action) => {
      const { day, type, amount } = action.payload;
      state.subscriptionsArray.push({ day: Number(day), type, amount });
      saveBudgetDataToRealm(state)
    },
    updateSubscriptionDate: (state, action) => {
      const { day, typeDescription, date } = action.payload;

      const subscription = state.subscriptionsArray.find(sub =>
        sub.day === day && sub.type.description === typeDescription
      );

      if (subscription) {
        subscription.lastProcessedDate = date;
        saveBudgetDataToRealm(state); 
      }
    },
    deleteSubscription: (state, action) => {
      const { day, type, amount } = action.payload;
      state.subscriptionsArray = state.subscriptionsArray.filter(
        (subscription) =>
          subscription.day !== day ||
          subscription.type.id !== type.id ||
          subscription.amount !== amount
      );
      saveBudgetDataToRealm(state)
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
      saveBudgetDataToRealm(state);
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
      saveBudgetDataToRealm(state)
    },
    setBudget: (state, action) => {
      const { budget, salaryDifference } = action.payload;
      const formatedBudget = Number(budget);

      state.total += salaryDifference;
      state.budget = formatedBudget;
      saveBudgetDataToRealm(state)
    },
    resetBudgetData: (state, action) => {
      const { salary } = action.payload;
      state.total = Number(salary);
      state.expense = 0;
      state.income = 0;
      saveBudgetDataToRealm(state)
    },
    initializeBudgetState: (state, action) => {
      return action.payload;
    },
  },
});

export const initializeBudgetFromRealm = () => (dispatch) => {
  const budgetInfo = fetchBudgetDataFromRealm();
  if (budgetInfo) {
    dispatch(initializeBudgetState(budgetInfo));
  } else {
    saveBudgetDataToRealm(initialState);
    dispatch(initializeBudgetState(initialState));
  }
};

export const selectName = (state) => state.budget.name;
export const selectTotal = (state) => state.budget.total;
export const selectExpense = (state) => state.budget.expense;
export const selectIncome = (state) => state.budget.income;
export const selectCurrency = (state) => state.budget.currency;
export const selectBudget = (state) => state.budget.budget;

export const selectMonthlyIncome = (state) => state.budget.incomeArray;

export const selectStartDate = (state) => state.budget.startDate;
export const selectExpensesArray = (state) => state.budget.expensesArray;
export const selectSubscriptions = (state) => state.budget.subscriptionsArray

export const selectBudgetData = createSelector(
  [selectTotal, selectExpense, selectIncome, selectCurrency, selectBudget],
  (total, expense, income, currency, budget) => ({
    total,
    expense,
    income,
    currency,
    budget
  })
);

export const { addExpense, deleteExpense, setTotal, setBudget, addIncome, setCurrency, setStartDate, addSubscription,updateSubscriptionDate, deleteSubscription,resetBudgetData, initializeBudgetState } = budgetSlice.actions;
export default budgetSlice.reducer;
