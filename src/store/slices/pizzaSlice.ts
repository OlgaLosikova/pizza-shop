import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
const baseUrl = 'https://6671410ce083e62ee43abe0a.mockapi.io/items';

export type Pizza= {
id:number;
title:string;
price:number;
imageUrl:string;
sizes:number[];
types:number[];
rating:number;
}
interface PizzaSliceState {
  items:Pizza[];
  status:'loading' | 'success'| 'error'

}

export const fetchData = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchDataStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `${baseUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});
const initialState:PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
   reducers: {
    setPizza(state, action:PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
   },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
  },
});

export const selectPizzaData = (state:RootState) => state.pizza;

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
