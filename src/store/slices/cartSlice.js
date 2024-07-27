import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItemFromCart(state, action) {
      state.items.filter((item) => action.payload !== item.id);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
