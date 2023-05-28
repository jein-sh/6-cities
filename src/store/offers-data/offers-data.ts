import {createSlice} from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../cities';
import {NameSpace, SortType} from '../../const';
import {OffersData} from '../../types/state';
import {fetchOffersAction} from '../api-actions';

const initialState: OffersData = {
  allOffers: [],
  isDataLoaded:false,
  city: DEFAULT_CITY,
  offers: [],
  sortType: SortType.Popular,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    cityChoice: (state, action) => {
      const {currentCity} = action.payload;
      state.city = currentCity;
    },
    sortChoice: (state, action) => {
      const {currentSortType} = action.payload;
      state.sortType = currentSortType;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.isDataLoaded = false;
      });
  }
});

export const {cityChoice, sortChoice} = offersData.actions;
