import calcTotalPrice from "./calcTotalPrice";

const getCartFromLocalStorage=()=>{
  const data=localStorage.getItem('cart');
const items= data?JSON.parse(data):[];
const totalPrice=calcTotalPrice(items)

  return {
    items,
    totalPrice
  }

}
export default getCartFromLocalStorage;