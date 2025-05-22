import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCartFromLocalStorage from '../../helpers/getCartFromLocalStorage';
import calcTotalPrice from '../../helpers/calcTotalPrice';
import { CartItemType, CartSliceState} from './types';

const initialState:CartSliceState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action:PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItemFromCart(state, action:PayloadAction<number>) {
      state.items = state.items.filter((item) => action.payload !== item.id);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    minusPizza(state, action:PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
  },
});
export const { addItemToCart, removeItemFromCart, clearItems, minusPizza } = cartSlice.actions;
export default cartSlice.reducer;
