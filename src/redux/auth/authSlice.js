import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  signUp,
  signIn,
  getUser,
  refreshToken,
  updateProfile,
} from './authOperations';

const initialState = {
  user: {
    username: null,
    email: null,
  },
  token: null,
  localId: null,
  refreshToken: null, 
  loading: false,
  loadingUser: false, 
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.email;
        state.token = payload.idToken;
        state.refreshToken = payload.refreshToken;
        state.localId = payload.localId;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.username = payload.displayName;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.email;
        state.user.username = payload.displayName;
        state.token = payload.idToken;
        state.refreshToken = payload.refreshToken;
        state.localId = payload.localId;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.loadingUser = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.user.email = payload.email;
        state.user.username = payload.displayName;
        state.localId = payload.localId;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingUser = false;
        state.token = null;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.token = payload.id_token;
        state.refreshToken = payload.refresh_token;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingUser = false;
        state.token = null;
        state.refreshToken = null;
      })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          signIn.pending,
          refreshToken.pending,
          updateProfile.pending
        ),
        (state) => {
          state.error = null;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(signUp.rejected, signIn.rejected, updateProfile.rejected),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export const { signOut } = authSlice.actions;
