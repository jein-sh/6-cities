import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Offer, Offers } from './offer';
import { City } from './city';
import { Reviews } from './review';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | undefined;
};

export type OffersData = {
  allOffers: Offers;
  isDataLoaded: boolean;
  city: City;
  offers: Offers;
  sortType: string;
};

export type RoomData = {
  currentOffer: Offer | undefined;
  isOfferLoaded: boolean;
  nearbyOffers: Offers,
  comments: Reviews,
};

export type Favorite = {
  favorite: Offers;
  isFavoriteLoaded: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
