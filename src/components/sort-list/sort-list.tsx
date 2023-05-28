import { useState } from 'react';
import { SortType } from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { sortChoice } from '../../store/offers-data/offers-data';
import { getSortType } from '../../store/offers-data/selectors';

function SortList(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);

  const [sortList, setSortList] = useState<boolean>(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={()=> setSortList(!sortList)}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortList ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sort) => (
          <li className={`places__option ${sort === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sort}
            onClick={() => {
              dispatch(sortChoice({currentSortType: sort}));
              setSortList(false);
            }}
          >
            {sort}
          </li>
        ))}

      </ul>
    </form>
  );
}

export default SortList;
