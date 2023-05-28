import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {Favorite} from '../../types/state';
import {fetchFavoriteAction} from '../api-actions';

const initialState: Favorite = {
  favorite: [],
  isFavoriteLoaded:false,
};

export const favorite = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    resetFavorite: (state) => {
      state.favorite = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isFavoriteLoaded = true;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
        state.isFavoriteLoaded = false;
      });
  }
});

export const {resetFavorite} = favorite.actions;
