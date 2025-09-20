import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import type { AuthState } from './slices/authSlice';
import authReducer from './slices/authSlice';

interface RootReducerType {
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth: authReducer,
}) as unknown as ReturnType<typeof combineReducers<RootReducerType>>;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
