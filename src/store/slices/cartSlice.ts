import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemType={
  id: number;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;

}
interface CartSliceState{
  totalPrice:number,
  items:CartItemType[],
}
const initialState:CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action:PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj?.count + sum;
      }, 0);
    },
    removeItemFromCart(state, action:PayloadAction<number>) {
      state.items = state.items.filter((item) => action.payload !== item.id);
      console.log('state.items', state.items);
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

export const selectCart = (state:RootState ) => state.cart;
export const selectCartItemById = (id:number) => (state:RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItemToCart, removeItemFromCart, clearItems, minusPizza } = cartSlice.actions;
export default cartSlice.reducer;
