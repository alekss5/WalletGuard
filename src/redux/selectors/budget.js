import { createSelector } from "reselect";

export const selectTotal = (state) => state.budget.total;
export const selectExpense = (state) => state.budget.expense;
export const selectIncome = (state) => state.budget.income;
export const selectCurrency = (state) => state.budget.currency;
export const selectBudget = (state) => state.budget.budget;
export const selectStartDate = (state) => state.budget.startDate;
export const selectExpensesArray = (state) => state.budget.expensesArray;
export const selectSubscriptions = (state) => state.budget.subscriptionsArray;
export const selectMonthlyIncome = (state) => state.budget.incomeArray;
export const selectBudgetState = (state) => state.budget;

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