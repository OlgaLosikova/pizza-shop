import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = 'https://6671410ce083e62ee43abe0a.mockapi.io/items';

export const fetchData = createAsyncThunk('pizza/fetchDataStatus', async (params, thunkAPI) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `${baseUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});
const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  // reducers: {
  //   setPizza(state, action) {
  //     state.items = action.payload;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });
  },
});

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
