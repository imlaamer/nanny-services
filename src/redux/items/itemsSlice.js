import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  items: [],

  isLoading: false,
  error: null,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},

  // extraReducers: (builder) =>
  //   builder.addCase().addMatcher(isAnyOf(), (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   }),
});

// export const {} = itemsSlice.actions;
