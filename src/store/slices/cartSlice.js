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
      state.items = state.items.filter((item) => action.payload !== item.id);
      console.log('state.items', state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    minusPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearItems, minusPizza } = cartSlice.actions;
export default cartSlice.reducer;
