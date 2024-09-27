import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeFromRealm = (sliceName, fetchFunction, initialState) => 
  createAsyncThunk(`${sliceName}/initializeFromRealm`, async () => {
    const realmData = await fetchFunction();
    if (realmData) {
      return realmData; 
    } else {
      return initialState;
    }
  });
