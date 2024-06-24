import { createSelector } from '@reduxjs/toolkit';

export const selectAllNannies = (state) => state.nannies;

export const selectNannies = createSelector(
  selectAllNannies,
  (nannies) => nannies.nannies
);

export const selectPage = createSelector(
  selectAllNannies,
  (nannies) => nannies.page
);

export const selectFavsPage = createSelector(
  selectAllNannies,
  (nannies) => nannies.favsPage
);

export const selectLastValue = createSelector(
  selectAllNannies,
  (nannies) => nannies.lastValue
);

export const selectIsLoadMore = createSelector(
  selectAllNannies,
  (nannies) => nannies.isLoadMore
);

export const selectIsLoading = createSelector(
  selectAllNannies,
  (nannies) => nannies.isLoading
);

export const selectFilter = createSelector(
  selectAllNannies,
  (nannies) => nannies.filter
);

export const selectFavsFilter = createSelector(
  selectAllNannies,
  (nannies) => nannies.favsFilter
);


export const selectFavorites = createSelector(
  selectAllNannies,
  (nannies) => nannies.favorites
);

export const selectSortedFavorites = createSelector(
  selectAllNannies,
  (nannies) => nannies.sortedFavorites
);

