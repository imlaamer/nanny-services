import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { limit } from '../../helpers/constants';
import { setQueryParams } from '../../helpers/setQueryParams';
import { sortNannies } from '../../helpers/sortNannies';
import { setLastValuePayload } from '../../helpers/setLastValuePayload';

const BASE_URL = import.meta.env.VITE_DATABASE_URL;
const API_ENDPOINT = 'nannies';

//---------examples for query params---------
// ?orderBy="height"&startAt=3&print=pretty'

//orderBy поле за яким фільтруєм
//startAt - height greater than 3

// orderBy="dimensions/height

// orderBy="$value"&startAt=50&print=pretty' - all dinosaurs with a score higher than 50,

//----------get all
export const getAllNannies = createAsyncThunk(
  'nannies/getNannies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${API_ENDPOINT}.json`);
      return data;
    } catch (error) {
      toast.error(error.response.data.error.message);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

//----------pagination
export const getNannies = createAsyncThunk(
  'nannies/getNannies',
  async (_, ThunkAPI) => {
    let queryParams = null;
    const { lastValue } = ThunkAPI.getState().nannies;

    //------------винести в апі  !!!!!
    queryParams = `orderBy="id"&limitToFirst=${limit}&startAfter=${lastValue}`;
    // if (lastValue) {
    //   queryParams = `orderBy="id"&limitToFirst=${limit}&startAfter=${lastValue}`;
    // } else {
    //   queryParams = `orderBy="id"&limitToFirst=${limit}`;
    // }

    try {
      const { data } = await axios.get(
        `${BASE_URL}/${API_ENDPOINT}.json/?${queryParams}`
      );
      console.log(`${BASE_URL}/${API_ENDPOINT}.json/?${queryParams}`); //-
      console.log(data, 'data from fb'); //-

      if (!lastValue) return data;
      let newArr = [];
      if (data?.length > 0) {
        data.map((item) => {
          if (item !== null) {
            newArr.push(item);
          }
        });
        console.log(newArr, 'map'); //-
      } else {
        newArr = Object.values(data);
        console.log(newArr, 'Obj values'); //-
      }
      return newArr;
    } catch (error) {
      toast.error(error.response.data.error.message);
      return ThunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

//----------sortNannies + get 3 (pagination)

// TEST getSortedNannies !!

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
      console.log(`${BASE_URL}/${API_ENDPOINT}.json/?${queryParams}`); //-
      console.log(data, 'data from fb'); //-

      // if (!lastValue) {
      //   newArr = sortNannies(filter, Object.values(data));
      //   return newArr;
      // }

      let arr = [];
      if (Array.isArray(data)) {
        data.map((item) => {
          if (item !== null) {
            arr.push(item);
          }
        });
        console.log(arr, 'map'); //-
      } else {
        arr = Object.values(data);
        console.log(arr, 'Obj values'); //-
      }

      // newArr = sortNannies(filter, arr);
      // return newArr;

      const property = setLastValuePayload(filter);

      items = sortNannies(filter, arr);
      return { items, property };
    } catch (error) {
      toast.error(error.response.data.error.message);
      return ThunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);
//-----------------

// import {
//   getFavorites,
//   getNannies,
//   getSortedFavorites,
//   getSortedNannies,
// } from '../../services/nannies-api';

// //--------------nannies
// export const getNanniesData = createAsyncThunk(
//   'nannies/getNanniesData',
//   async (_, ThunkAPI) => {
//     try {
//       const { lastValue } = ThunkAPI.getState().nannies;
//       const data = await getNannies(lastValue);
//       return data;
//     } catch (error) {
//       toast.error(error?.message);
//       return ThunkAPI.rejectWithValue(error?.message);
//     }
//   }
// );

// export const getSortedNanniesData = createAsyncThunk(
//   'nannies/getSortedNanniesData',
//   async (_, ThunkAPI) => {
//     try {
//       const { filter, lastValue } = ThunkAPI.getState().nannies;
//       const data = await getSortedNannies(
//         filter,
//         lastValue,
//       );
//       return data;
//     } catch (error) {
//       toast.error(error?.message);
//       return ThunkAPI.rejectWithValue(error?.message);
//     }
//   }
// );
// //----------------favorites
// export const getFavoritesData = createAsyncThunk(
//   'nannies/getFavoritesData',
//   async (_, ThunkAPI) => {
//     try {
//       const { lastValue } = ThunkAPI.getState().nannies;
//       const {
//         user: { id },
//       } = ThunkAPI.getState().auth;
//       const data = await getFavorites(lastValue,  id);
//       return data;
//     } catch (error) {
//       toast.error(error?.message);
//       return ThunkAPI.rejectWithValue(error?.message);
//     }
//   }
// );

// export const getSortedFavsData = createAsyncThunk(
//   'nannies/getSortedFavsData',
//   async (_, ThunkAPI) => {
//     const {
//       user: { id },
//     } = ThunkAPI.getState().auth;
//     try {
//       const { filter, lastValue } = ThunkAPI.getState().nannies;
//       const data = await getSortedFavorites(filter, lastValue, id);
//       return data;
//     } catch (error) {
//       toast.error(error?.message);
//       return ThunkAPI.rejectWithValue(error?.message);
//     }
//   }
// );
