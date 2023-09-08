import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        // If the item is not in the cart, add it
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate other cart properties and update the state
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // savePaymentMethod: (state, action) => {
    //   state.paymentMethod = action.payload;
    //   localStorage.setItem("cart", JSON.stringify(state));
    // },
    // clearCartItems: (state, action) => {
    //   state.cartItems = [];
    //   localStorage.setItem("cart", JSON.stringify(state));
    // },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    // resetCart: (state) => (state = initialState),
  },
});
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  // savePaymentMethod,
  // clearCartItems,
  // resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
