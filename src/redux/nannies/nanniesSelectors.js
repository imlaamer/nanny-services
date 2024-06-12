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

export const selectLastValue = createSelector(
  selectAllNannies,
  (nannies) => nannies.lastValue
);

export const selectFirstValue = createSelector(
  selectAllNannies,
  (nannies) => nannies.firstValue
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
// const selectItems = (state) => state.items;

// export const selectError = createSelector(selectItems, (items) => items.error);

// export const selectNannies = (state) => state.nannies.nannies;
