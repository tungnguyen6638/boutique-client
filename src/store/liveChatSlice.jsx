import { createSlice } from "@reduxjs/toolkit";

const liveChatInitialState = {
  isDisplay: false,
};

const liveChatSlice = createSlice({
  name: "liveChat",
  initialState: liveChatInitialState,
  reducers: {
    toggleLiveChat(state) {
      state.isDisplay = !state.isDisplay;
    },
  },
});

export default liveChatSlice.reducer;

export const liveChatActions = liveChatSlice.actions;
