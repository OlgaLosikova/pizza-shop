import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {SortPropertyEnum } from '../store/filter/types';
import { setSortType } from '../store/filter/slice';
export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
  
};
export type SortProps={
  value:SortItem
}
export const sortItems: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC},
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC},
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC},
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sort:React.FC<SortProps>=React.memo(({value})=>{
  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (index: SortItem) => {
    dispatch(setSortType(index));
    setIsVisible(false);
  };
  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      const _event=e.target as HTMLElement;
      const eventParent=_event?.parentElement;
      if (sortRef.current&&eventParent!==sortRef.current) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div  className="sort">
      <div className="sort__label" ref={sortRef}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((sortItem:SortItem) => (
              <li
                key={sortItem.name}
                onClick={() => handleSelect(sortItem)}
                className={value.sortProperty === sortItem.sortProperty ? 'active' : ''}>
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})
export default Sort;