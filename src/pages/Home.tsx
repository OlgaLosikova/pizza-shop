import { useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectFilter,
  setCategotyId,
  setCurrentPage,
  setFilters,

} from '../store/slices/filterSlice';
import { fetchData, Pizza, selectPizzaData, Status } from '../store/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzaCard';
import PizzaSkeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../store/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  const onClickCategory = (id: number) => {
    dispatch(setCategotyId(id));
  };
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
    window.scrollTo(0,0);
  };

  //Если был первый рендер и изменили параметры url, вшиваем параметры в url
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`/?${queryString}`);
  //   }
  //   if (window.location.search) {
  //     dispatch(fetchData({} as SearchPizzaParams));
  //   }
  // }, []);

  //Если был первый рендер, то проверяем существуют ли url параметры и сохраняем в редаксе
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortItems.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || sortItems[0]
  //     }));
  //     isSearch.current = true;
  //   }
  // }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер запрашиваем пиццы
  useEffect(() => {
    // window.scrollTo(0, 0);
    // if (!isSearch.current) {
      fetchPizza();
    //}
    //isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const pizzas = items.map(
    (item: Pizza) => <PizzaCard key={item.id} {...item} />,
  );
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id: number) => onClickCategory(id)} />
        <Sort />
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
