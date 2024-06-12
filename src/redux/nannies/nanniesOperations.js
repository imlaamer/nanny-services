import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getNannies, getRatedNannies } from '../../services/nannies-api';

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

export const getRatedNanniesData = createAsyncThunk(
  'nannies/getRatedNanniesData',
  async (_, ThunkAPI) => {
    try {
      const { filter, firstValue, lastValue } = ThunkAPI.getState().nannies;
      const data = await getRatedNannies(filter, firstValue, lastValue);
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);
