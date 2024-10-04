import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import teamReducer from "./slice/teamSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist the 'user' slice
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    team: teamReducer,
  },
});

export const persistor = persistStore(store);