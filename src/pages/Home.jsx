import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategotyId, setCurrentPage, setFilters } from '../store/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortItems } from '../components/Sort';
import PizzaCard from '../components/PizzaCard';
import PizzaSkeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);
  const baseUrl = 'https://6671410ce083e62ee43abe0a.mockapi.io/items';
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onClickCategory = (id) => {
    dispatch(setCategotyId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  //get-запрос для получения пицц
  const fetchPizza = () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `${baseUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        setPizza(response.data);
        setIsLoading(false);
      });
  };

  //Если был первый рендер и изменили параметры url, вшиваем параметры в url
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем существуют ли url параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);
  const pizzas = pizza.map((pizza) => (
    <PizzaCard
      key={pizza.id}
      title={pizza.title}
      price={pizza.price}
      imgUrl={pizza.imageUrl}
      sizes={pizza.sizes}
      types={pizza.types}
    />
  ));
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination page={currentPage} onChangePage={(number) => onChangePage(number)} />
    </div>
  );
}
