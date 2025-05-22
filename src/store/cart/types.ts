export type CartItemType={
  id: number;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;

}
export interface CartSliceState{
  totalPrice:number,
  items:CartItemType[],
}