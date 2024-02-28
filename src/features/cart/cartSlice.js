import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrder } from '../../services/apiRestaurant';
import Order from '../order/Order';

const initialState = {
  cart: [],
  status: 'idle',
  error: '',
};

export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder',
  async function (id) {
    const order = await getOrder(id);
    console.log(order);
    return Order;
  },
);

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
  extraReducers: (build) =>
    build
      .addCase(
        fetchOrder.pending,
        (state, action) => (state.status = 'loading'),
      )
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = 'Error while loading data';
      }),
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQunatity,
  clearCart,
  updateCart,
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
