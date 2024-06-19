import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  setUser,
  getUser,
  // resetUser,
} from './authOperations';

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    favorites: [], //id
  },
  isLoggedIn: false,
  isRefreshing: false,
  token: '',
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: () => {
      return initialState;
    },
    updateFavorites: (state, { payload }) => {
      state.user.favorites = [...state.user.favorites, payload];
    },
    removeFromFavorites: (state, {payload}) => {
      const index = state.user.favorites.findIndex(
        (advert) => advert._id === payload //payload = id
      );
       state.user.favorites.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------  SET USER - sign up  ------------
      .addCase(setUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      // ---------------  GET USER - sign in ------------
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      //--------------- REFRESH  ------------------
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.loading = false;
        state.error = null;
      })
      //-------------- RESET USER - logout ------------------
      // .addCase(resetUser.fulfilled, () => {
      //   return initialState;
      // })

      // ---------------  REGISTER  ------------
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      // --------------  LOGIN  ----------------
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      //-------------- LOGOUT ------------------
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      })

      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = { ...state.user, ...payload };
      })
      .addCase(refreshUser.rejected, (state) => {
        // state.isRefreshing = false;
        return initialState; // ?
      })

      .addMatcher(
        //pending
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          logoutUser.pending,

          setUser.pending,
          getUser.pending
          // resetUser.pending
        ),
        (state) => {
          state.error = null;
          state.loading = true;
        }
      )
      //rejected
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          logoutUser.rejected,

          setUser.rejected,
          getUser.rejected
          // resetUser.rejected
        ),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export const { resetUser, updateFavorites, removeFromFavorites } = authSlice.actions;
