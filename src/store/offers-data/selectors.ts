import { createSelector } from 'reselect';
import {NameSpace} from '../../const';
import { City } from '../../types/city';
import { Offers } from '../../types/offer';
import {State} from '../../types/state';
import { getFilterOffers, getSortedOffers } from '../../untils';

export const getAllOffers = (state: State): Offers => state[NameSpace.Data].allOffers;
export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getSortType = (state: State): string => state[NameSpace.Data].sortType;

export const getFilteredOffers = createSelector (
  [getAllOffers, getCity, getSortType],
  (allOffers, city, sortType) => {
    const filteredOffers = getFilterOffers(allOffers, city);
    return getSortedOffers(filteredOffers, sortType);
  }
);
