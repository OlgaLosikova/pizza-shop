import { createSlice } from '@reduxjs/toolkit';

const initialState = { sort: { name: 'популярности', sortProperty: 'rating' }, categoryId: 0 };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategotyId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategotyId, setSortType } = filterSlice.actions;
export default filterSlice.reducer;
