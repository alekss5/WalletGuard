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

const persistConfig = {
  key: "root",
  version: 1,
  storage:AsyncStorage,
  whitelist:["ui,budget,personalInfo"]
};

const rootReducer = combineReducers({ 
 ui:uiReducer,
 budget:budgetReducer,
 personalInfo:personalInfReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
