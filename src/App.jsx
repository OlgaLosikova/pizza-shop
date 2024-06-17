import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';
import pizzas from './components/assets/pizzas.json';
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
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
        </div>
      </div>
    </div>
  );
}

export default App;