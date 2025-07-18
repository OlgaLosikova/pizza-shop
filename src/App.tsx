import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Cart = lazy(() => import(/*webpackChunkName:"Cart"*/'./pages/Cart'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Suspense fallback={<div>Загрузка корзины...</div>}><Cart /></Suspense>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
