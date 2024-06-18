import { useState } from 'react';

export default function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => (
          <li
            key={categorie}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}>
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
}
