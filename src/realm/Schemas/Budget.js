
export const expenseSchema = {
    name: "Expense",
    properties: {
      amount: "string",
      category: "Category",
      date: "string",
    },
  };
  
  export const incomeSchema = {
    name: "Income",
    properties: {
      amount: "string",
      category: "Category",
      date: "string",
    },
  };
  
  export const subscriptionSchema = {
    name: "Subscription",
    properties: {
      day: "int",
      type: "Category",
      amount: "string",
      lastProcessedDate: 'string?',
    },
  };
  export const categorySchema = {
    name: "Category",
    properties: {
      description: "string",
      icon: "string",
      id: "string",
    },
  };
  
  export const budgetSchema = {
    name: "Budget",
    primaryKey: "_id", 
    properties: {
      _id: "string",
      total: { type: "double", default: 0 },
      expense: { type: "double", default: 0 },
      income: { type: "double", default: 0 },
      startDate: { type: "int", default: 1 },
      currency: "string?",
      subscriptionsArray: "Subscription[]",
      expensesArray: "Expense[]",
      incomeArray: "Income[]",
      budget: { type: "double", default: 800 },
    },
  };