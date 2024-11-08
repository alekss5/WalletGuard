import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import uiReducer from "./uiReducer";
import budgetReducer from "./budgetReducer";
import personalInfReducer from "./personalInfReducer";
import uiNoRealm from "./uiNoRealmReducer"

import { saveUIStateToRealm, saveBudgetDataToRealm, savePersonalInfoToRealm } from '../realm/realmInstance';  // Assuming you have these in a separate file

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["ui", "budget", "personalInfo",'uiNoRealm']
};

const rootReducer = combineReducers({ 
  ui: uiReducer,
  budget: budgetReducer,
  personalInfo: personalInfReducer,
   uiNoRealm: uiNoRealm,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action); 
  
  const state = store.getState();

  if (action.type.startsWith('ui/')) {
    saveUIStateToRealm(state.ui);
  } else if (action.type.startsWith('budget/')) {
    saveBudgetDataToRealm(state.budget);
  } else if (action.type.startsWith('personalInfo/')) {
    savePersonalInfoToRealm(state.personalInfo);
  }

  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(saveStateMiddleware),  
});

export let persistor = persistStore(store);
