import { createAction, createReducer } from "@reduxjs/toolkit";
import { message } from "antd";

export const setResults = createAction("SET_RESULTS");

const initialState = {
  results: [],
};

const reducer = createReducer(initialState, {
  [setResults]: (state, action) => {
    if (!action.payload.length) message("Sorry! No results found 😢");

    state.results = action.payload;
  },
});

export default reducer;
