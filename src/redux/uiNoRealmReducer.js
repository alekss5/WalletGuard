import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDoneAnimation: false,
};

const uiNoRealmSlice = createSlice({
  name: "uiNoRealm",
  initialState,
  reducers: {
    toggleDoneAnumation: (state, action) => {
      state.showDoneAnimation = !state.showDoneAnimation;
    },
  }
});


export const {
    toggleDoneAnumation,

} = uiNoRealmSlice.actions;

export default uiNoRealmSlice.reducer;
