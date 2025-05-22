import { CartItemType } from "../store/cart/types";
import calcTotalPrice from "./calcTotalPrice";

const getCartFromLocalStorage=()=>{
  const data=localStorage.getItem('cart');
const items= data?JSON.parse(data):[];
const totalPrice=calcTotalPrice(items)

  return {
    items:items as CartItemType[],
    totalPrice
  }

}
export default getCartFromLocalStorage;