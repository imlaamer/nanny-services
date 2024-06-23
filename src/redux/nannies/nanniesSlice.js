import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  // getFavoritesData,
  getNannies,
  getSortedNannies,
  // getNanniesData,
  // getSortedFavsData,
  // getSortedNanniesData,
} from './nanniesOperations';
import { limit } from '../../helpers/constants';

const initialState = {
  nannies: [],
  page: 1, //?
  favsPage: 1, //?
  lastValue: null,
  filter: 'a-to-z',
  isLoading: false,
  error: null,
  isLoadMore: true,
  favorites: [],
};

export const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {
    //----------------page
    increasePage: (state) => {
      state.page = state.page + 1;
    }, //
    increaseFavsPage: (state) => {
      state.favsPage = state.favsPage + 1;
    }, //
    updateLast: (state, { payload }) => {
      state.lastValue = payload; //-
    },
    resetNannies: (state) => {
      state.isLoading = false;
      state.error = null;
      state.nannies = [];
      state.page = 1; //?
      state.favsPage = 1; //?
      state.isLoadMore = true;
      state.lastValue = null;
      // tsate.filter: 'a-to-z',

      // state.favorites: [],
      // return initialState; //
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },

    // removeNannieFromFavs: (state, { payload }) => {
    //   const index = state.favorites.findIndex(
    //     (fav) => fav.id === payload //payload = id
    //   );
    //   state.favorites.splice(index, 1);
    //   if (state.favorites.length < limit) state.isLoadMore = false; //
    // },
  },

  extraReducers: (builder) =>
    builder
      .addCase(
        getNannies.fulfilled,
        (state, { payload: { items, property } }) => {
          state.isLoading = false;
          state.nannies = [...state.nannies, ...items];
          if (items.length < limit) state.isLoadMore = false;
          if (items.length === 0) return;
          state.lastValue = items[items.length - 1][property];
        }
      ) //if limit is 3 but its also the last items portion ?
      .addCase(
        getSortedNannies.fulfilled,
        (state, { payload: { items, property } }) => {
          state.isLoading = false;
          state.nannies = [...state.nannies, ...items];
          if (items.length < limit) state.isLoadMore = false;

          if (items.length === 0) return;
          state.lastValue = items[items.length - 1][property];
        }
      )

      // //-----------favorites
      // .addCase(getFavoritesData.fulfilled, (state, { payload }) => {
      //   console.log('payload get favs', payload); //-
      //   state.isLoading = false;
      //   state.favorites = [...state.favorites, ...payload];
      //   if (payload.length < limit) state.isLoadMore = false; //
      //   if (payload.length === 0) return;
      //   state.lastValue = payload[payload.length - 1].id;
      // })

      // .addCase(getSortedFavsData.fulfilled, (state, { payload }) => {
      //   state.isLoading = false;
      //   // console.log(payload, 'payload sorted, slice');
      //   state.favorites = [...state.favorites, ...payload];
      //   if (payload.length < limit) state.isLoadMore = false;
      //   if (payload.length === 0) return;
      //   if (state.filter === 'popular' || state.filter === 'not-popular') {
      //     state.lastValue = payload[payload.length - 1].rating;
      //     return;
      //   }
      //   if (state.filter === 'a-to-z' || state.filter === 'z-to-a') {
      //     state.lastValue = payload[payload.length - 1].name;
      //     return;
      //   }
      //   if (
      //     state.filter === 'less-than-10' ||
      //     state.filter === 'greater-than-10'
      //   ) {
      //     state.lastValue = payload[payload.length - 1].price_per_hour;
      //   }
      // })

      .addMatcher(
        isAnyOf(
          // getNanniesData.pending,
          // getSortedNanniesData.pending,
          // getFavoritesData.pending,
          // getSortedFavsData.pending,
          getNannies.pending,
          getSortedNannies.pending
        ),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          // getNanniesData.rejected,
          // getSortedNanniesData.rejected,
          // getFavoritesData.rejected,
          // getSortedFavsData.rejected,
          getNannies.rejected,
          getSortedNannies.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const {
  increasePage,
  increaseFavsPage,

  updateLast,
  resetNannies,
  setFilter,

  // removeNannieFromFavs,
  // updateFavorites,
} = nanniesSlice.actions;

//  state.firstValue = payload[0].rating;
