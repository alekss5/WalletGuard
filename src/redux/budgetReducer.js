import { createSlice } from "@reduxjs/toolkit";
import { fetchBudgetDataFromRealm } from "../realm/realmInstance";
import { initializeFromRealm } from "./reduxHelpers";

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

export const initializeBudget = initializeFromRealm(
  "budget",
  fetchBudgetDataFromRealm,
  initialState
);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const { amount, category, date } = action.payload;
      state.expense += Number(amount);
      state.total -= Number(amount);
      state.expensesArray.push({ amount, category, date: date });
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
      }
    },
    setTotal: (state, action) => {
      const { salary } = action.payload;
      state.total = Number(salary);
    },
    addIncome: (state, action) => {
      const { amount, category, date } = action.payload;
      state.income += Number(amount);
      state.total += Number(amount);
      state.incomeArray.push({ amount, category, date: date });
    },
    addSubscription: (state, action) => {
      const { day, type, amount } = action.payload;
      state.subscriptionsArray.push({ day: Number(day), type, amount });
    },
    updateSubscriptionDate: (state, action) => {
      const { day, typeDescription, date } = action.payload;

      const subscription = state.subscriptionsArray.find(sub =>
        sub.day === day && sub.type.description === typeDescription
      );

      if (subscription) {
        subscription.lastProcessedDate = date;
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
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setBudget: (state, action) => {
      const { budget, salaryDifference } = action.payload;
      const formatedBudget = Number(budget);

      state.total += salaryDifference;
      state.budget = formatedBudget;
    },
    resetBudgetData: (state, action) => {
      const { salary } = action.payload;
      state.total = Number(salary);
      state.expense = 0;
      state.income = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeBudget.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});



export const {
  addExpense,
  deleteExpense,
  setTotal,
  setBudget,
  addIncome,
  setCurrency,
  setStartDate,
  addSubscription,
  updateSubscriptionDate,
  deleteSubscription,
  resetBudgetData,
  initializeBudgetState,
} = budgetSlice.actions;

export default budgetSlice.reducer;
