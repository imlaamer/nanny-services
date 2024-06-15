import { createSelector } from '@reduxjs/toolkit';

export const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (auth) => auth.user);

export const selectLoading = createSelector(selectAuth, (auth) => auth.loading);

export const selectError = createSelector(selectAuth, (auth) => auth.error);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (auth) => auth.isLoggedIn
);

export const selectRefreshingStatus = createSelector(
  selectAuth,
  (auth) => auth.isRefreshing
);

export const selectFavorites = createSelector(
  selectAuth,
  (auth) => auth.user.favorites
);