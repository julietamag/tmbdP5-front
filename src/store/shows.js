import { createAction, createReducer } from "@reduxjs/toolkit";

export const setShows = createAction("SET_SHOWS"); //SET_SHOWS


const initialState = {
  shows: [],

};

const reducer = createReducer(initialState, {
  [setShows]: (state, action) => {
    state.length = 0;

    action.payload.results.map((result) => state.shows.push(result));
  },
  
});

export default reducer;
