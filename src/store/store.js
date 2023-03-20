import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import moviesReducer from "./movies";
import showsReducer from './shows'
import searchReducer from './search'

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    shows: showsReducer,
    search: searchReducer,
  },
});

export default store;
