import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      //--------------- REFRESH  ------------------
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.loading = false;
        state.error = null;
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
        isAnyOf(registerUser.pending, loginUser.pending, logoutUser.pending),
        (state) => {
          state.error = null;
          state.loading = true;
        }
      )
      //rejected
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected, logoutUser.rejected),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});
