import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      const item = state.cart.filter(
        (currEle) => currEle.pizzaId !== action.payload,
      );
      state.cart = item;
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find(function (currEle) {
        return currEle.pizzaId === action.payload;
      });

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQunatity(state, action) {
      const item = state.cart.find(function (currEle) {
        return currEle.pizzaId === action.payload;
      });
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQunatity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce(function (acc, currEle) {
    return acc + currEle.quantity;
  }, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(function (acc, currEle) {
    return acc + currEle.totalPrice;
  }, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
