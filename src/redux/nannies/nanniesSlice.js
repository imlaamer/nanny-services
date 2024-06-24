import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getSortedNannies } from './nanniesOperations';
import { limit } from '../../helpers/constants';
import { sortNannies } from '../../helpers/sortNannies';

const initialState = {
  nannies: [],
  lastValue: null,
  filter: 'a-to-z',
  favsFilter: 'a-to-z',
  isLoading: false,
  error: null,
  isLoadMore: true,
  favorites: [],
  sortedFavorites: null,
};

export const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {
    //--------------nannies
    resetNannies: (state) => {
      state.isLoading = false;
      state.error = null;
      state.nannies = [];
      state.isLoadMore = true;
      state.lastValue = null;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    //--------------favorites
    setFavsFilter: (state, { payload }) => {
      state.favsFilter = payload;
    },
    addToFavorites: (state, { payload }) => {
      state.favorites = [...state.favorites, payload];
    },
    removeFromFavs: (state, { payload }) => {
      const index = state.favorites.findIndex((fav) => fav.id === payload);
      state.favorites.splice(index, 1);
    },
    sortFavorites: (state) => {
      const sortedNannies = sortNannies(
        state.favsFilter,
        state.favorites,
        true
      );
      state.sortedFavorites = [...sortedNannies];
      if (state.sortedFavorites.length < limit) state.isLoadMore = false;
    },
  },

  extraReducers: (builder) =>
    builder
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
      .addMatcher(isAnyOf(getSortedNannies.pending), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(getSortedNannies.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const {
  updateLast,
  resetNannies,
  setFilter,
  addToFavorites,
  removeFromFavs,
  sortFavorites,
  setFavsFilter,
} = nanniesSlice.actions;
