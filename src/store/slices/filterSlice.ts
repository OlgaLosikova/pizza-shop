import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort= {
  name: string, 
  sortProperty: 'rating'|'title'|'price',
}
interface FilterSliceState {
  searchValue:string,
  sort:Sort,
  categoryId: number,
  currentPage: number,
}
const initialState:FilterSliceState = {
  searchValue: '',
  sort: { name: 'популярности', sortProperty: 'rating' },
  categoryId: 0,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategotyId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action:PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action:PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state:RootState) => state.filter;
export const selectSort = (state:RootState) => state.filter.sort;

export const { setCategotyId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
