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
import { customMiddlewareLogger } from './Middleware/customMiddlewareLogger';
import { authSlice } from '../redux/auth/authSlice';
import { nanniesSlice } from './nannies/nanniesSlice';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    nannies: nanniesSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //.concat(customMiddlewareLogger),
  // devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
