import { createSelector } from '@reduxjs/toolkit';

export const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (auth) => auth.user);

export const selectUserId = createSelector(selectAuth, (auth) => auth.user.id);

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

//------- useAuth 
// export const selectLoading = (state) => state.auth.loading;

// export const selectError = (state) => state.auth.error;

// export const selectUser = (state) => state.auth.user;

// export const selectLoggedInStatus = (state) => state.auth.isLoggedIn;

// export const selectToken = (state) => state.auth.token;

// export const selectRefreshingStatus = (state) => state.auth.isRefreshing;


