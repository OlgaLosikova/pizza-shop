export default function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => (
          <li
            key={categorie}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
}
