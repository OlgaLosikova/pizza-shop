import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  setCategotyId,
  setCurrentPage
} from '../store/filter/slice';
import { selectFilter } from '../store/filter/selector';
import { fetchData } from '../store/pizza/asyncActions';
import { Pizza, Status } from '../store/pizza/types';
import { selectPizzaData } from '../store/pizza/selector';
import { Categories, Sort, PizzaCard, PizzaSkeleton, Pagination } from "../components/index";
import { useAppDispatch } from '../store/store';
const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategotyId(id));
  }, [])
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizza = () => {
    const order: string = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue;

    dispatch(
      fetchData({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    fetchPizza();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const pizzas = items.map(
    (item: Pizza) => <PizzaCard key={item.id} {...item} />,
  );
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id: number) => onClickCategory(id)} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Попробуйте зайти сюда позднее</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : pizzas}</div>
      )}
      <Pagination page={currentPage} onChangePage={(number: number) => onChangePage(number)} />
    </div>
  );
};
export default Home;
