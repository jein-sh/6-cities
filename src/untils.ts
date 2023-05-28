import dayjs from 'dayjs';
import { SortType } from './const';
import { City } from './types/city';
import { Offers } from './types/offer';
import { Review } from './types/review';

export const getFilterOffers = (offers : Offers, city : City) => (offers.filter((offer) => offer.city.name === city.name));

const sortOffers: {[sortType : string] : (offers :Offers) => Offers} = {

  [SortType.Popular]: (offers) => offers,

  [SortType.LowToHigh]: (offers) => offers.sort((offerA, offerB) => (offerA.price - offerB.price)),

  [SortType.HighToLow]: (offers) => offers.sort((offerA, offerB) => (offerB.price - offerA.price)),

  [SortType.TopRatedFirst ]: (offers) => offers.sort((offerA, offerB) => (offerB.rating - offerA.rating)),

};

export const getSortedOffers = (offers : Offers, sortType : string) : Offers => sortOffers[sortType](offers);

export const sortDate = (commentA : Review, commentB : Review) => dayjs(commentB.date).diff(commentA.date);

export const getRandomArrIndex = (length: number) => Math.floor(Math.random() * (length));
