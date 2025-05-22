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