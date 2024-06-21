import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getFavoritesData,
  getNanniesData,
  getRatedFavsData,
  getRatedNanniesData,
} from './nanniesOperations';
import { limit } from '../../helpers/constants';

const initialState = {
  nannies: [],
  page: 1,
  favsPage: 1,
  lastValue: null,
  firstValue: null,
  filter: null,
  isLoading: false,
  error: null,
  isLoadMore: true,
  favorites: [], //?
};

export const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {
    //----------------page
    increasePage: (state) => {
      // if (state.filteredAdverts.length > 0)
      //   state.filtersPage = state.filtersPage + 1; // ??
      // else
      state.page = state.page + 1;
    },
    increaseFavsPage: (state) => {
      state.favsPage = state.favsPage + 1;
    },
    updateLast: (state, { payload }) => {
      state.lastValue = payload;
    },
    updateFirst: (state, { payload }) => {
      state.firstValue = payload;
    },
    resetNannies: (state) => {
      state.nannies = [];
      state.lastValue = null;
      state.firstValue = null;
      state.page = 1;
      state.favsPage = 1;
      state.filter = null;
      state.isLoadMore = true; //
      state.favorites = []; //
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },

    //-------favorites
    updateFavorites: (state, { payload }) => {
      state.favorites = [...state.favorites, payload];
    },
    removeNannieFromFavs: (state, { payload }) => {
      const index = state.favorites.findIndex(
        (fav) => fav.id === payload //payload = id
      );
      state.favorites.splice(index, 1);
      if (state.favorites < limit) state.isLoadMore = false; //
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getNanniesData.fulfilled, (state, { payload }) => {
        console.log('payload get nannies', payload);
        state.isLoading = false;
        // console.log(payload, 'payload'); //
        state.nannies = [...state.nannies, ...payload];
        if (payload.length < limit) state.isLoadMore = false; //
        if (payload.length === 0) return;
        state.firstValue = payload[0].id;
        state.lastValue = payload[payload.length - 1].id;
      }) //if limit is 3 but its also the last items portion ?

      .addCase(getRatedNanniesData.fulfilled, (state, { payload }) => {
        console.log(payload); //-
        state.isLoading = false;
        // console.log(payload, 'payload sorted, slice');
        state.nannies = [...state.nannies, ...payload];
        if (payload.length < limit) state.isLoadMore = false; //

        if (state.filter === 'popular' || state.filter === 'not-popular') {
          state.firstValue = payload[0].rating;
          state.lastValue = payload[payload.length - 1].rating;
          return;
        }
        if (state.filter === 'a-to-z' || state.filter === 'z-to-a') {
          state.firstValue = payload[0].name;
          state.lastValue = payload[payload.length - 1].name;
        }
        if (
          state.filter === 'less-than-10' ||
          state.filter === 'greater-than-10'
        ) {
          state.firstValue = payload[0].price_per_hour;
          state.lastValue = payload[payload.length - 1].price_per_hour;
        }
      }) //if limit is 3 but its also the last items portion ?

      //firstValue ВИДАЛИТИ

      //-----------favorites
      .addCase(getFavoritesData.fulfilled, (state, { payload }) => {
        console.log('payload get favs', payload); //-
        state.isLoading = false;
        state.favorites = [...state.favorites, ...payload];
        if (payload.length < limit) state.isLoadMore = false; //
        if (payload.length === 0) return;
        state.firstValue = payload[0].id;
        state.lastValue = payload[payload.length - 1].id;
      })

      .addCase(getRatedFavsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log(payload, 'payload sorted, slice');
        state.favorites = [...state.favorites, ...payload];
        if (payload.length < limit) state.isLoadMore = false; //
        state.firstValue = payload[0].rating;
        state.lastValue = payload[payload.length - 1].rating;
      }) //if limit is 3 but its also the last items portion ?

      .addMatcher(
        isAnyOf(
          getNanniesData.pending,
          getRatedNanniesData.pending,
          getFavoritesData.pending,
          getRatedFavsData.pending
        ),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getNanniesData.rejected,
          getRatedNanniesData.rejected,
          getFavoritesData.rejected,
          getRatedFavsData.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const {
  increasePage,
  updateLast,
  resetNannies,
  updateFirst,
  setFilter,
  removeNannieFromFavs,
  increaseFavsPage,
  updateFavorites,
} = nanniesSlice.actions;
