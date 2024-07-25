import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategotyId } from '../store/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzaCard';
import PizzaSkeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const { searchValue } = useContext(SearchContext);
  const baseUrl = 'https://6671410ce083e62ee43abe0a.mockapi.io/items';
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const onClickCategory = (id) => {
    dispatch(setCategotyId(id));
  };
  useEffect(() => {
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
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
