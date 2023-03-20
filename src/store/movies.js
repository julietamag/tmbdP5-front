import { createAction, createReducer } from "@reduxjs/toolkit";

export const setMovies = createAction("SET_MOVIES"); //SET_SHOWS

const initialState = {
  movies: [],
};

const reducer = createReducer(initialState, {
  [setMovies]: (state, action) => {
    state.length = 0;

    action.payload.results.map((result) => state.movies.push(result));
  },
});

export default reducer;
