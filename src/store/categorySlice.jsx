import { createSlice } from "@reduxjs/toolkit";

const categoryInitialState = {
  category: "all",
};

const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialState,
  reducers: {
    allCategory(state) {
      state.category = "all";
    },
    iphoneCategory(state) {
      state.category = "Iphone";
    },
    ipadCategory(state) {
      state.category = "Ipad";
    },
    macCategory(state) {
      state.category = "Mac";
    },
    watchCategory(state) {
      state.category = "Watch";
    },
    airpodCategory(state) {
      state.category = "Airpod";
    },
    mouseCategory(state) {
      state.category = "Mouse";
    },
    keyboardCategory(state) {
      state.category = "Keyboard";
    },
    otherCategory(state) {
      state.category = "Other";
    },
    setCategory(state, payload) {
      state.category = payload.payload;
    },
  },
});

export default categorySlice.reducer;

export const categoryActions = categorySlice.actions;
