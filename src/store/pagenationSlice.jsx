import { createSlice } from "@reduxjs/toolkit";

const pagenationInitialState = {
  currentPage: 1,
};

const pagenationSlice = createSlice({
  name: "pagenation",
  initialState: pagenationInitialState,
  reducers: {
    setCurrentPage(state, payload) {
      state.currentPage = payload.payload;
    },
  },
});

export default pagenationSlice.reducer;

export const pagenationActions = pagenationSlice.actions;
