import { useDispatch } from 'react-redux';
import { addItemToCart, CartItemType, minusPizza, removeItemFromCart } from '../store/slices/cartSlice';
import React from 'react';
type CartItemProps = {
  id: number;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};
const CartItem: React.FC<CartItemProps> = ({ id, title, price, count, imageUrl, type, size }) => {
  const dispatch = useDispatch();
  const handlePlusPizza = () => {
    dispatch(addItemToCart({ id } as CartItemType));
  };
  const handleMinusPizza = () => {
    dispatch(minusPizza(id));
  };
  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove?')) {
      dispatch(removeItemFromCart(id));
    }
  };
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza=block-img" src={imageUrl} alt="pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см
        </p>
      </div>
      <div className="cart__item-count">
        {count > 1 && (
          <svg
            onClick={handleMinusPizza}
            className="button button--outline button--circle cart__item-count-minus"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 50 50"
            height="50px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 50 50"
            width="50px">
            <rect fill="none" height="50" width="50" />
            <line
              fill="none"
              stroke="#ddd"
              stroke-miterlimit="10"
              stroke-width="4"
              x1="9"
              x2="41"
              y1="25"
              y2="25"
            />
          </svg>
        )}
        <b>{count}</b>
        <svg
          onClick={handlePlusPizza}
          className="button button--outline button--circle"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 50 50"
          height="50px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 50 50"
          width="50px">
          <rect fill="none" height="50" width="50" />
          <line
            fill="none"
            stroke="#ddd"
            stroke-miterlimit="10"
            stroke-width="4"
            x1="9"
            x2="41"
            y1="25"
            y2="25"
          />
          <line
            fill="none"
            stroke="#ddd"
            stroke-miterlimit="10"
            stroke-width="4"
            x1="25"
            x2="25"
            y1="9"
            y2="41"
          />
        </svg>
      </div>
      <div className="cart__item-price">
        <b>{price * count}</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle">
          <svg
            onClick={handleRemove}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Capa 1"
            id="Capa_1"
            viewBox="0 0 20 19.84">
            <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
