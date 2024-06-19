import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getNanniesData, getRatedNanniesData } from './nanniesOperations';
import { limit } from '../../helpers/constants';

const initialState = {
  nannies: [],
  page: 1,
  lastValue: null,
  firstValue: null,
  filter: null,
  isLoading: false,
  error: null,
  isLoadMore: true,
  // favorites: [],
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
      state.filter = null;
      state.isLoadMore = true;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getNanniesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log(payload, 'payload'); //

        state.nannies = [...state.nannies, ...payload];
        if (payload.length < limit) state.isLoadMore = false;

        state.firstValue = payload[0].id;
        state.lastValue = payload[payload.length - 1].id;
      }) //if limit is 3 but its also the last items portion ?

      .addCase(getRatedNanniesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        console.log(payload, 'payload sorted, slice');

        state.nannies = [...state.nannies, ...payload];
        if (payload.length < limit) state.isLoadMore = false;

        state.firstValue = payload[0].rating;
        state.lastValue = payload[payload.length - 1].rating;
      }) //if limit is 3 but its also the last items portion ?

      .addMatcher(
        isAnyOf(getNanniesData.pending, getRatedNanniesData.pending),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(getNanniesData.rejected, getRatedNanniesData.rejected),
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
} = nanniesSlice.actions;
