import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho cart slice
const cartInitialState = {
  listCart: JSON.parse(localStorage.getItem("cartArr"))
    ? JSON.parse(localStorage.getItem("cartArr"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    // addCart
    addCart(state, payload) {
      // Kiểm tra nếu listCart ko có thì sẽ push payload vào
      if (state.listCart.length === 0) {
        state.listCart.push(payload.payload);
      } else {
        // Tạo 1 biến itemExist để kiểm tra lúc add vào item có tồn tại hay chưa
        let itemExist = false;
        // Lặp qua listCart
        state.listCart.forEach((cart, index) => {
          // Nếu item trong list cart có id bằng với id của payload (tức là item đã tồn tại rồi) thì sẽ gán biến itemExist là có item
          // đồng thời sửa lại item trong listCart có index bằng index đang lặp các thông tin của payload mới add vào
          if (
            cart.product["_id"]["$oid"] ===
            payload.payload.product["_id"]["$oid"]
          ) {
            itemExist = true;
            state.listCart[index] = {
              product: cart.product,
              quantity:
                Number(cart.quantity) + Number(payload.payload.quantity),
              total: Number(cart.total) + Number(payload.payload.total),
            };
          }
        });
        // Nếu như chưa có item thì sẽ push item của payload vào listCart
        if (!itemExist) {
          state.listCart.push(payload.payload);
        }
      }
      // Gắn listCart vào localStorage
      localStorage.setItem("cartArr", JSON.stringify(state.listCart));
    },
    updateCart(state, payload) {
      state.listCart.forEach((cart, index) => {
        if (
          cart.product["_id"]["$oid"] === payload.payload.product["_id"]["$oid"]
        ) {
          state.listCart[index] = {
            product: cart.product,
            quantity: payload.payload.quantity,
            total: payload.payload.total,
          };
        }
      });
      localStorage.setItem("cartArr", JSON.stringify(state.listCart));
    },
    deleteCart(state, payload) {
      state.listCart.forEach((cart, index) => {
        if (
          cart.product["_id"]["$oid"] === payload.payload.product["_id"]["$oid"]
        ) {
          state.listCart.splice(index, 1);
        }
      });
      localStorage.setItem("cartArr", JSON.stringify(state.listCart));
    },
    deleteAllCart(state) {
      state.listCart.splice(0, state.listCart.length);
      localStorage.removeItem("cartArr");
    },
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
