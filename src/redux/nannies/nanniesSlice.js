import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getNanniesData } from './nanniesOperations';

const initialState = {
  nannies: [],
  page: 1,

  isLoading: false,
  error: null,
  // isLoadMore: true,  //?
  // favorites: [],
  // sortedNannies or  push sorted in nannies ?
  // filtersPage: 1,
  // filter: '',
};

export const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  // reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getNanniesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload, 'payload');
        state.nannies = [...state.nannies, ...payload];
      })

      .addMatcher(isAnyOf(getNanniesData.pending), (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(getNanniesData.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

// export const {} = nanniesSlice.actions;
