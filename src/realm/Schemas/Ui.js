export const uiSchema = {
    name: "UI",           
    primaryKey: "_id",     
    properties: {
      _id: "string",      
      isDarkTheme: { type: "bool", default: false },        
      visibleTotalBalance: { type: "bool", default: false }, 
      visibleMonthlyBudget: { type: "bool", default: false },
      visibleMonthlyGoal: { type: "bool", default: true },
      visibleExpenseDate: { type: "bool", default: true },
      visibleDecimal: { type: "bool", default: true },

      lastDateIn: { type: "string", default: '' },
      dailyNotification: { type: "bool", default: true }, 
      overBudgetNotification: { type: "bool", default: true },
      weeklyNotification: { type: "bool", default: true },
      subscriptionNotification: { type: "bool", default: true },
      monthlyRefreshNotification:{ type: "bool", default: true },
    },
  };