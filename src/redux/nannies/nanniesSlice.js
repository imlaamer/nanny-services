import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getNannies, getSortedNannies } from './nanniesOperations';
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
  // favsPage: 1,
};

export const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {
    resetNannies: (state) => {
      state.isLoading = false;
      state.error = null;
      state.nannies = [];
      state.isLoadMore = true;
      state.lastValue = null;
      // state.favsPage = 1; // reset favsPage
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
      // if (state.favorites.length <= limit) state.isLoadMore = false;
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
    // increaseFavsPage: (state) => {
    //   state.favsPage = state + favsPage + 1;
    // },
  },

  // delete getNannies  !
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
      .addMatcher(
        isAnyOf(getNannies.pending, getSortedNannies.pending),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(getNannies.rejected, getSortedNannies.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
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
