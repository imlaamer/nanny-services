import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getFavorites,
  getNannies,
  getSortedFavorites, 
  getSortedNannies,
} from '../../services/nannies-api';

//--------------nannies
export const getNanniesData = createAsyncThunk(
  'nannies/getNanniesData',
  async (_, ThunkAPI) => {
    try {
      const { lastValue } = ThunkAPI.getState().nannies;
      const data = await getNannies(lastValue);
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getSortedNanniesData = createAsyncThunk(
  'nannies/getSortedNanniesData',
  async (_, ThunkAPI) => {
    try {
      const { filter, lastValue } = ThunkAPI.getState().nannies;
      const data = await getSortedNannies(
        filter,
        lastValue,
      );
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);
//----------------favorites
export const getFavoritesData = createAsyncThunk(
  'nannies/getFavoritesData',
  async (_, ThunkAPI) => {
    try {
      const { lastValue } = ThunkAPI.getState().nannies;
      const {
        user: { id },
      } = ThunkAPI.getState().auth;
      const data = await getFavorites(lastValue,  id);
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getSortedFavsData = createAsyncThunk(
  'nannies/getSortedFavsData',
  async (_, ThunkAPI) => {
    const {
      user: { id },
    } = ThunkAPI.getState().auth;
    try {
      const { filter, lastValue } = ThunkAPI.getState().nannies;
      const data = await getSortedFavorites(filter, lastValue, id);
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);
