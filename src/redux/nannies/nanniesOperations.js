import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getFavorites, getNannies, getRatedNannies } from '../../services/nannies-api';

export const getNanniesData = createAsyncThunk(
  'nannies/getNanniesData',
  async (_, ThunkAPI) => {
    try {
      const { lastValue } = ThunkAPI.getState().nannies;      
      const data = await getNannies(lastValue,);
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);

//needs refactoring:
export const getRatedNanniesData = createAsyncThunk(
  'nannies/getRatedNanniesData',
  async (isFavoritesPage, ThunkAPI) => {
    const {
      user: { id },
    } = ThunkAPI.getState().auth;
    try {
      const { filter, firstValue, lastValue } = ThunkAPI.getState().nannies;
      const data = await getRatedNannies(
        filter,
        firstValue,
        lastValue,
        isFavoritesPage,
        id
      );
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);
//---------favorites

export const getFavoritesData = createAsyncThunk(
  'nannies/getFavoritesData',
  async (isFavoritesPage, ThunkAPI) => {
    try {
      const { lastValue } = ThunkAPI.getState().nannies;
      const {
        user: { id },
      } = ThunkAPI.getState().auth; 
      const data = await getFavorites(lastValue, isFavoritesPage, id);
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);
