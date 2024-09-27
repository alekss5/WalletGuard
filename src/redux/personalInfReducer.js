import { createSlice } from "@reduxjs/toolkit";
import { fetchPersonalInfoFromRealm } from "../realm/realmInstance";
import { initializeFromRealm } from "./reduxHelpers";

const initialState = {
  name: '',
  age: '',
  salary: '',
  jobSector: '',
  passTheSetup: false,
};

export const initializePersonalInfo = initializeFromRealm(
  "personalInfo",
  fetchPersonalInfoFromRealm, 
  initialState 
);

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setJobInformation: (state, action) => {
      const { salary, jobSector } = action.payload;
      state.salary = String(salary);
      state.jobSector = jobSector;
      state.passTheSetup = true;
    },
    setPersonalInfo: (state, action) => {
      const { name, age } = action.payload;
      state.name = name;
      state.age = String(age);
    },
    setSalary: (state, action) => {
      state.salary = String(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializePersonalInfo.fulfilled, (state, action) => {
      return action.payload; 
    });
  },
});



export const { setPersonalInfo, setSalary, setJobInformation } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
