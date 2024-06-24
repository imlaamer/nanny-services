import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_USER_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(
        `${BASE_URL}:signUp?key=${API_KEY}`,
        body
      );
      return data;
    } catch (error) {
      const errMsg = error.response.data.error.message;
    
      if (errMsg === 'EMAIL_EXISTS') {
        toast.error('The email address is already in use by another account');
      } else if (errMsg === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        toast.error(
          'We have blocked all requests from this device due to unusual activity. Try again later.'
        );
      } else {
        toast.error(error.response.data.error.message);
      }
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(
        `${BASE_URL}:update?key=${API_KEY}`,
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(
        `${BASE_URL}:signInWithPassword?key=${API_KEY}`,
        body
      );
      return data;
    } catch (error) {
      const errMsg = error.response.data.error.message;
      if (errMsg === 'INVALID_LOGIN_CREDENTIALS') {
        toast.error(
          'Invalid login or password. Also, please check if you have registered.'
        );
      } else {
        toast.error(error.response.data.error.message);
      }
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (token, thunkApi) => {
    const persistedToken = token ?? thunkApi.getState().auth.token;

    if (!persistedToken) {
      return thunkApi.rejectWithValue();
    }
    try {
      const body = { idToken: persistedToken };
      const { data } = await axios.post(
        `${BASE_URL}:lookup?key=${API_KEY}`,
        body
      );
      return data.users[0];
    } catch (error) {
      const errMsg = error.response.data.error.message;
      if (errMsg === 'INVALID_ID_TOKEN') {
        thunkApi.dispatch(refreshToken());
      }
      return thunkApi.rejectWithValue(errMsg);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkApi) => {
    try {
      const persistedRefreshToken = thunkApi.getState().auth.refreshToken;

      if (!persistedRefreshToken) {
        return thunkApi.rejectWithValue();
      }

      const body = {
        grant_type: 'refresh_token',
        refresh_token: persistedRefreshToken,
      };
      const { data } = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        body
      );
      thunkApi.dispatch(getUser(data.id_token));
      return data;
    } catch (error) {
      const errMsg = error.response.data.error.message;
      return thunkApi.rejectWithValue(errMsg);
    }
  }
);
