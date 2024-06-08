import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getNannies } from '../../services/nannies-api';

export const getNanniesData = createAsyncThunk(
  'nannies/getNanniesData',
  async (_, ThunkAPI) => {
    try {
      const data = await getNannies();
      return data;
    } catch (error) {
      toast.error(error?.message);
      return ThunkAPI.rejectWithValue(error?.message);
    }
  }
);
