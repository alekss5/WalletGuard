import { createSlice } from "@reduxjs/toolkit";
import { fetchPersonalInfoFromRealm } from "../realm/realmInstance";
import { initializeFromRealm } from "./reduxHelpers";

const initialState = {
  name: "",
  age: "",
  salary: "",
  jobSector: "",
  passTheSetup: false,
  isPremium:true,
  premiumExpiresAt: null,
  premiumAutoRenew:false,
  subscriptionType: "", 
  email:"",
  joinedDate:"",
  jsonToken:"",
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
      state.joinedDate = new Date().toISOString().split('T')[0];
    },
    setPersonalInfo: (state, action) => {
      const { name, age } = action.payload;
      state.name = name;
      state.age = String(age);
    },
    setSalary: (state, action) => {
      state.salary = String(action.payload);
    },
    setToken:(state, action) => {
      state.jsonToken = action.payload
    },
    setEmail:(state, action) => {
      state.email = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializePersonalInfo.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  
});



export const { setPersonalInfo, setSalary,setEmail, setJobInformation,setToken } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
