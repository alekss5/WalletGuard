export * from './services/uiService';
export * from './services/personalInfoService';
export * from './services/budgetService';
export { closexRealm } from './services/realmConfig';



// import Realm from "realm";
// import { personalInfoSchema } from "./Schemas/PersonalInfo";
// import { uiSchema } from "./Schemas/Ui";
// import { expenseSchema,incomeSchema,subscriptionSchema,categorySchema,budgetSchema } from "./Schemas/Budget";

// const realmConfig = {
//     schema: [uiSchema, personalInfoSchema,
//       expenseSchema, incomeSchema, subscriptionSchema, categorySchema, budgetSchema
//     ],
//     schemaVersion: 1,
//   };
  
// const realm = new Realm(realmConfig);

// export const fetchUIStateFromRealm = () => {
//     try {
//       const uiData = realm.objectForPrimaryKey("UI", "uiState");
//       if (uiData) {
//         return {
//           isDarkTheme: uiData.isDarkTheme,
//           visibleTotalBalance: uiData.visibleTotalBalance,
//           visibleMonthlyBudget: uiData.visibleMonthlyBudget,
//           visibleMonthlyGoal: uiData.visibleMonthlyGoal,
//           lastDateIn:  uiData.lastDateIn,
//           dailyNotification:uiData.dailyNotification,
//           overBudgetNotification:uiData.overBudgetNotification,
//           weeklyNotification:uiData.weeklyNotification,
//           subscriptionNotification:uiData.subscriptionNotification,
//           monthlyRefreshNotification:uiData.monthlyRefreshNotification,
//         };
//       }
//     } catch (error) {
//       console.error("Error fetching UI state from Realm: ", error);
//     }
//     return null;
//   };
  
//   // Function to save UI state to Realm
//   export const saveUIStateToRealm = (uiState) => {
//     try {
//       realm.write(() => {
//         realm.create(
//           "UI",
//           {
//             _id: "uiState", 
//             isDarkTheme: uiState.isDarkTheme,
//             visibleTotalBalance: uiState.visibleTotalBalance,
//             visibleMonthlyBudget: uiState.visibleMonthlyBudget,
//             visibleMonthlyGoal: uiState.visibleMonthlyGoal,
//             lastDateIn:uiState.lastDateIn,
//             dailyNotification:uiState.dailyNotification,
//             overBudgetNotification:uiState.overBudgetNotification,
//             weeklyNotification:uiState.weeklyNotification,
//             subscriptionNotification:uiState.subscriptionNotification,
//             monthlyRefreshNotification:uiState.monthlyRefreshNotification,
//           },
//           Realm.UpdateMode.Modified 
//         );
//       });
//     } catch (error) {
//       console.error("Error saving UI state to Realm: ", error);
//     }
//   };
  
//   // Function to fetch Personal Info state from Realm
//   export const fetchPersonalInfoFromRealm = () => {
//     try {
//       const personalInfo = realm.objectForPrimaryKey("PersonalInfo", "personalInfoState");
//       if (personalInfo) {
//         return {
//           name: personalInfo.name,
//           age: personalInfo.age,
//           salary: personalInfo.salary,
//           jobSector: personalInfo.jobSector,
//           passTheSetup: personalInfo.passTheSetup
//         };
//       }
//     } catch (error) {
//       console.error("Error fetching Personal Info from Realm: ", error);
//     }
//     return null;
//   };
  
//   // Function to save Personal Info state to Realm
//   export const savePersonalInfoToRealm = (personalInfoState) => {
//     try {
//       realm.write(() => {
//         realm.create(
//           "PersonalInfo",
//           {
//             _id: "personalInfoState", 
//             name: personalInfoState.name,
//             age: personalInfoState.age,
//             salary: personalInfoState.salary,
//             jobSector: personalInfoState.jobSector,
//             passTheSetup: personalInfoState.passTheSetup
//           },
//           Realm.UpdateMode.Modified 
//         );
//       });
//     } catch (error) {
//       console.error("Error saving Personal Info to Realm: ", error);
//     }
//   };


//   export const fetchBudgetDataFromRealm = () => {
//     try {
//       const budgetData = realm.objectForPrimaryKey("Budget", "budgetState"); // Assuming "budgetState" is the _id
//       if (budgetData) {
//        // Convert Realm arrays to plain JavaScript arrays
//       const subscriptionsArray = budgetData.subscriptionsArray.map(subscription => ({
//         day: subscription.day,
//         type: { ...subscription.type },
//         amount: subscription.amount,
//         lastProcessedDate:subscription.lastProcessedDate
//       }));

//       const expensesArray = budgetData.expensesArray.map(expense => ({
//         amount: expense.amount,
//         category: { ...expense.category },  // Spread category type
//         date: expense.date
//       }));

//       const incomeArray = budgetData.incomeArray.map(income => ({
//         amount: income.amount,
//         category: { ...income.category },  // Spread category type
//         date: income.date
//       }));

//       return {
//         total: budgetData.total,
//         expense: budgetData.expense,
//         income: budgetData.income,
//         startDate: budgetData.startDate,
//         currency: budgetData.currency,
//         subscriptionsArray,  // Now plain JavaScript arrays
//         expensesArray,
//         incomeArray,
//         budget: budgetData.budget,
//       };
//       }
//     } catch (error) {
//       console.error("Error fetching budget data from Realm: ", error);
//     }
//     return null;
//   };
  
//   // Example function to save budget data to Realm
//   export const saveBudgetDataToRealm = (budgetState) => {
//     try {
//       realm.write(() => {
//         realm.create(
//           "Budget",
//           {
//             _id: "budgetState", // Unique ID for the budget state
//             total: budgetState.total,
//             expense: budgetState.expense,
//             income: budgetState.income,
//             startDate: budgetState.startDate,
//             currency: budgetState.currency,
//             subscriptionsArray: budgetState.subscriptionsArray,
//             expensesArray: budgetState.expensesArray,
//             incomeArray: budgetState.incomeArray,
//             budget: budgetState.budget,
//           },
//           Realm.UpdateMode.Modified // Update existing data if it exists
//         );
//       });
//     } catch (error) {
//       console.error("Error saving budget data to Realm: ", error);
//     }
//   };

//   export const closeRealm = () => {
//     if (!realm.isClosed) {
//       realm.close();
//     }
//   };
  