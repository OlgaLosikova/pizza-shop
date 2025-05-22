import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types';
import { fetchData } from './asyncActions';


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
export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
