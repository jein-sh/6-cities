import {NameSpace} from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import {State} from '../../types/state';

export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.Room].currentOffer;
export const getOfferLoadedStatus = (state: State): boolean => state[NameSpace.Room].isOfferLoaded;
export const getComments = (state: State): Reviews => state[NameSpace.Room].comments;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Room].nearbyOffers;
