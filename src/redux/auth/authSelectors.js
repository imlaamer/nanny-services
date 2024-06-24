export const selectUserName = (state) => state.auth.user.username;
export const selectIsLoggedIn = (state) => !!state.auth.token; 
export const selectToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading;
export const selectLoadingUser = (state) => state.auth.loadingUser;
export const selectError = (state) => state.auth.error;


