import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import bookmarksReducer from './bookSlice.js'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bookmarks'] // only bookmarks will be persisted
}

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)