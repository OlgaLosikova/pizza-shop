import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: { name: 'популярности', sortProperty: 'rating' },
  categoryId: 0,
  currentPage: 1,
};

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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategotyId, setSortType, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
