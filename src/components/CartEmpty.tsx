import { Link } from 'react-router-dom';

export function CartEmpty() {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая</h2>
        <span>😩</span>
        <p>
          Вероятно вы не заказали еще пиццу.
          <br /> Чтобы сделать заказ перейдите на главную страницу
        </p>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
}
