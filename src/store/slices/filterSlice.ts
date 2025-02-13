import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export enum SortPropertyEnum{
RATING_DESC='rating',
RATING_ASC='-rating',
TITLE_DESC='title',
TITLE_ASC='-title',
PRICE_DESC='price',
PRICE_ASC='-price'

}
export type SortItem= {
  name: string, 
  sortProperty: SortPropertyEnum,
}
export interface FilterSliceState {
  searchValue:string,
  sort:SortItem,
  categoryId: number,
  currentPage: number,
}
const initialState:FilterSliceState = {
  searchValue: '',
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
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
    setSortType(state, action:PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action:PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
      }
        else {
          state.currentPage = 1
        state.sort = { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC}
        state.categoryId = 0
        }
    },
  },
});

export const selectFilter = (state:RootState) => state.filter;
export const selectSort = (state:RootState) => state.filter.sort;

export const { setCategotyId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
