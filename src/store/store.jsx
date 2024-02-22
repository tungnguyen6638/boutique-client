import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popupSlice";
import categoryReducer from "./categorySlice";
import pagenationReducer from "./pagenationSlice";
import authenticateReducer from "./authenticateSlice";
import cartReducer from "./cartSlice";
import liveChatReducer from "./liveChatSlice";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    category: categoryReducer,
    pagenation: pagenationReducer,
    authenticate: authenticateReducer,
    cart: cartReducer,
    liveChat: liveChatReducer,
  },
});

export default store;
