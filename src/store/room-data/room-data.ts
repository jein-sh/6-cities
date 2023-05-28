import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {RoomData} from '../../types/state';
import { sortDate } from '../../untils';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction, postCommentAction } from '../api-actions';

const initialState: RoomData = {
  currentOffer: undefined,
  isOfferLoaded:false,
  nearbyOffers: [],
  comments: [],
};

export const roomData = createSlice({
  name: NameSpace.Room,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOfferLoaded = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoaded = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload.sort(sortDate);
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload.sort(sortDate);
      });
  }
});
