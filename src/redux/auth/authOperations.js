import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createUserAndSetData,
  login,
  logout,
  refreshAndGetCurrentUser,
} from '../../services/auth-api';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, ThunkAPI) => {
    try {
      const user = await createUserAndSetData(credentials);
      toast.success('You`ve been successfully registered!');
      return user;
    } catch (error) {
      const errorCode = error?.code;

      if (errorCode === 'auth/email-already-in-use') {
        toast.error('The provided email is already in use by an existing user');
      } else {
        toast.error(error?.message);
      }
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, ThunkAPI) => {
    try {
      const user = await login(credentials);
      toast.success('Welcome!');
      return user;
    } catch (error) {
      // const errorCode = error?.code;
      //'auth/wrong-password'
      // toast.error(
      //   'Invalid login or password. Also, please check if you have registered.'
      // );
      toast.error(error?.messsage);
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, ThunkAPI) => {
    try {
      await logout();
      return;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const id = state.auth.user.id; //or token
      if (!id) {
        return thunkAPI.rejectWithValue('No id');
      } //?
      const user = await refreshAndGetCurrentUser(id, thunkAPI);
      // console.log(user, 'user from thunk');
      return user;
    } catch (error) {
      toast.error(error?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const updateUserData = createAsyncThunk(
//   'auth/updateUserData',
//   async (userData, thunkApi) => {
//     try {
//       const state = thunkApi.getState();
//       const token = state.auth.token;
//       const { data } = await apiUpdateUserData(userData, token);
//       toast.success('Your data were successfully updated!');
//       return data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
