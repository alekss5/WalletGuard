import Realm from 'realm';

export const expenseSchema = {
    name: "Expense",
    properties: {
      amount: "string",
      category: "Category",
      date: "string",
    },
  };
  
  // Income Schema
  export const incomeSchema = {
    name: "Income",
    properties: {
      amount: "string",
      category: "Category",
      date: "string",
    },
  };
  
  // Subscription Schema
  export const subscriptionSchema = {
    name: "Subscription",
    properties: {
      day: "int",
      type: "Category",
      amount: "string",
      lastProcessedDate: 'string?',
    },
  };
  
  // Category Schema (for both expenses and income)
  export const categorySchema = {
    name: "Category",
    properties: {
      description: "string",
      icon: "string",
      id: "string",
    },
  };
  
  // Budget Schema (holds your total budget data)
  export const budgetSchema = {
    name: "Budget",
    primaryKey: "_id", // Unique key for budget state
    properties: {
      _id: "string", // Could be a fixed key for a single budget entity
      total: { type: "double", default: 0 },
      expense: { type: "double", default: 0 },
      income: { type: "double", default: 0 },
      startDate: { type: "int", default: 1 },
      currency: "string?",
      subscriptionsArray: "Subscription[]", // Array of subscriptions
      expensesArray: "Expense[]",            // Array of expenses
      incomeArray: "Income[]",               // Array of income
      budget: { type: "double", default: 800 },
    },
  };