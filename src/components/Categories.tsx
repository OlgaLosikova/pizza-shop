import React from 'react';
type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};
const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => (
          <li
            key={categorie}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}>
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
}
)
export default Categories;
