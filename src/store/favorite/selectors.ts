import {NameSpace} from '../../const';
import { Offers } from '../../types/offer';
import {State} from '../../types/state';

export const getFavorite = (state: State): Offers => state[NameSpace.Favorite].favorite;
export const getFavoriteLoadedStatus = (state: State): boolean => state[NameSpace.Favorite].isFavoriteLoaded;
