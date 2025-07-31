import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {Header} from './components/index'
const Cart = lazy(() => import(/*webpackChunkName:"Cart"*/'./pages/Cart'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="pizza/:id" element={<PizzaCard/>}/> */}
          <Route path="/cart" element={<Suspense fallback={<div>Загрузка корзины...</div>}><Cart /></Suspense>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
