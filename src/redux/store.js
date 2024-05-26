import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { itemsSlice } from './items/itemsSlice';

import storage from 'redux-persist/lib/storage';

const config = {
  key: 'items',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    items: persistReducer(config, itemsSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
