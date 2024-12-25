import { createSlice } from "@reduxjs/toolkit";
import { fetchBudgetDataFromRealm } from "../realm/realmInstance";
import { initializeFromRealm } from "./reduxHelpers";
import { isCurrentMonth } from "../utils/GlobalFunctions";

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
    // addExpense: (state, action) => {
    //   const { amount, category, date } = action.payload;
    //   if(isCurrentMonth(date)){
    //     state.expense += Number(amount);
    //     state.total -= Number(amount);
    //   }
    //   state.expensesArray.push({ amount, category, date: date });
    // },
    addExpense: (state, action) => {
      const { amount, category, date } = action.payload;
      const normalizedAmount = parseFloat(amount); 

      if (isCurrentMonth(date)) {
        state.expense = parseFloat((state.expense + normalizedAmount).toFixed(2));
        state.total = parseFloat((state.total - normalizedAmount).toFixed(2));
      }

      const formattedAmount = normalizedAmount % 1 === 0 
        ? normalizedAmount.toString() 
        : normalizedAmount.toFixed(2).toString(); 

      state.expensesArray.push({ amount: formattedAmount, category, date });
    },
    deleteExpense: (state, action) => {
      const { amount, category, date } = action.payload;
      const normalizedAmount = parseFloat(amount);

      const expenseIndex = state.expensesArray.findIndex(
        (expense) =>
          parseFloat(expense.amount) === normalizedAmount &&
          expense.category.id === category.id &&
          expense.date === date
      );

      if (expenseIndex !== -1) {
        state.expense = parseFloat((state.expense - normalizedAmount).toFixed(2));
        state.total = parseFloat((state.total + normalizedAmount).toFixed(2));
        state.expensesArray.splice(expenseIndex, 1);
      }
    },
    setTotal: (state, action) => {
      const { salary } = action.payload;
      state.total = parseFloat(salary);
    },
    addIncome: (state, action) => {
      const { amount, category, date } = action.payload;
      state.income += parseFloat(amount);
      state.total += parseFloat(amount);
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
      const formatedBudget = parseFloat(budget);

      state.total += salaryDifference;
      state.budget = formatedBudget;
    },
    resetBudgetData: (state, action) => {
      const { salary } = action.payload;
      state.total = parseFloat(salary);
      state.expense = 0;
      state.income = 0;
    },
    nullTheExpenses: (state, action) => {
      console.log('reseting the budget')

      state.total = 2000,
      state.expensesArray = []
    },
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
  nullTheExpenses,
  initializeBudgetState,
} = budgetSlice.actions;

export default budgetSlice.reducer;
