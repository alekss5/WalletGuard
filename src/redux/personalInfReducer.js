import { createSlice } from "@reduxjs/toolkit";
import { savePersonalInfoToRealm, fetchPersonalInfoFromRealm } from "../realm/realmInstance";

const initialState = {
  name: '',
  age: '',
  salary: '',
  jobSector: '',
  passTheSetup: false,
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setJobInformation: (state, action) => {
      const { salary, jobSector } = action.payload;
      state.salary = String(salary);
      state.jobSector = jobSector;
      state.passTheSetup = true;
      savePersonalInfoToRealm(state); 
    },
    setPersonalInfo: (state, action) => {
      const { name, age } = action.payload;
      state.name = name;
      state.age = String(age);
      savePersonalInfoToRealm(state); 
    },
    setSalary: (state, action) => {
      state.salary = String(action.payload);
      savePersonalInfoToRealm(state); 
    },
    initializePersonalInfoState: (state, action) => {
      return action.payload; 
    },
  },
});

export const initializePersonalInfoFromRealm = () => (dispatch) => {
    const personalInfo = fetchPersonalInfoFromRealm();
    if (personalInfo) {
      dispatch(initializePersonalInfoState(personalInfo));
    } else {   
      savePersonalInfoToRealm(initialState); 
      dispatch(initializePersonalInfoState(initialState)); 
    }
  };
  

export const { setPersonalInfo,setSalary, setJobInformation, initializePersonalInfoState } = personalInfoSlice.actions;


export const selectName = (state) => state.personalInfo.name;
export const selectAge = (state) => state.personalInfo.age;
export const selectSalary = (state) => state.personalInfo.salary;
export const selectJobSector = (state) => state.personalInfo.jobSector;
export const selectIsPassSetup = (state) => state.personalInfo.passTheSetup;


export default personalInfoSlice.reducer;
