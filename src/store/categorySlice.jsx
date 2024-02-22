import { createSlice } from "@reduxjs/toolkit";

const categoryInitialState = {
  category: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialState,
  reducers: {
    allCategory(state) {
      state.category = "all";
    },
    iphoneCategory(state) {
      state.category = "iphone";
    },
    ipadCategory(state) {
      state.category = "ipad";
    },
    macCategory(state) {
      state.category = "mac";
    },
    watchCategory(state) {
      state.category = "watch";
    },
    airpodCategory(state) {
      state.category = "airpod";
    },
    mouseCategory(state) {
      state.category = "mouse";
    },
    keyboardCategory(state) {
      state.category = "keyboard";
    },
    otherCategory(state) {
      state.category = "other";
    },
    setCategory(state, payload) {
      state.category = payload.payload;
    },
  },
});

export default categorySlice.reducer;

export const categoryActions = categorySlice.actions;
