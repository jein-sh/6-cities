import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { favorite } from './favorite/favorite';
import { offersData } from './offers-data/offers-data';
import { roomData } from './room-data/room-data';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Favorite]: favorite.reducer,
  [NameSpace.Room]: roomData.reducer,
});
