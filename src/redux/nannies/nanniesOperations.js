import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { limit } from '../../helpers/constants';
import { setQueryParams } from '../../helpers/setQueryParams';
import { sortNannies } from '../../helpers/sortNannies';
import { setLastValuePayload } from '../../helpers/setLastValuePayload';

const BASE_URL = import.meta.env.VITE_DATABASE_URL;
const API_ENDPOINT = 'nannies';

export const getSortedNannies = createAsyncThunk(
  'nannies/getSortedNannies',
  async (_, ThunkAPI) => {
    let items = [];
    const { lastValue, filter } = ThunkAPI.getState().nannies;
    const queryParams = setQueryParams(filter, limit, lastValue);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${API_ENDPOINT}.json/?${queryParams}`
      );
      if (!data) return [];
      let arr = [];
      if (Array.isArray(data)) {
        data.map((item) => {
          if (item !== null) {
            arr.push(item);
          }
        });
      } else {
        arr = Object.values(data);
      }
      const property = setLastValuePayload(filter);
      items = sortNannies(filter, arr);
      return { items, property };
    } catch (error) {
      toast.error(error.response.data.error.message);
      return ThunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);
