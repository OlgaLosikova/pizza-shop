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

export enum Status {
  LOADING='loading',
  SUCCESS='success',
  ERROR='error'
}

interface PizzaSliceState {
  items:Pizza[];
  status:Status;
}
export type SearchPizzaParams={
  sortBy:string;
  order:string;
  category:string;
  search:string;
  currentPage:string;
}

export const fetchData = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchDataStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `${baseUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});
const initialState:PizzaSliceState = {
  items: [],
  status: Status.LOADING,
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
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchData.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state:RootState) => state.pizza;

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
