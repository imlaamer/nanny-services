import { createSelector } from '@reduxjs/toolkit';

const selectItems = (state) => state.items;

export const selectIsLoading = createSelector(
  selectItems,
  (items) => items.isLoading
);

export const selectError = createSelector(selectItems, (items) => items.error);
