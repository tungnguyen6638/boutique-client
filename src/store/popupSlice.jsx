import { createSlice } from "@reduxjs/toolkit";

const popupInitialState = {
  isVisible: false,
  productId: 0,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: popupInitialState,
  reducers: {
    showPopup(state, payload) {
      state.isVisible = true;
      state.productId = payload.payload;
    },
    hidePopup(state) {
      state.isVisible = false;
      state.productId = 0;
    },
  },
});

export default popupSlice.reducer;

export const popupActions = popupSlice.actions;
