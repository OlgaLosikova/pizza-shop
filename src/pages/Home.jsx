import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzaCard';
import PizzaSkeleton from '../components/PizzaCard/Skeleton';
import { useState, useEffect } from 'react';
export default function Home() {
  const baseUrl = 'https://6671410ce083e62ee43abe0a.mockapi.io/items';
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setPizza(arr);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizza.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                title={pizza.title}
                price={pizza.price}
                imgUrl={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
              />
            ))}
      </div>
    </>
  );
}
