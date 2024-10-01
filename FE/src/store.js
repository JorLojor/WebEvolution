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



// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slice/userSlice";
// import teamReducer from "./slice/teamSlice"; // Import teamReducer baru
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";

// // Persist config for user state
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'], // Only persist the 'user' slice
// };

// const persistedUserReducer = persistReducer(persistConfig, userReducer);

// // Store configuration
// export const store = configureStore({
//   reducer: {
//     user: persistedUserReducer, // Persisted user reducer
//     team: teamReducer, // Non-persisted team reducer
//   },
// });

// export const persistor = persistStore(store);
