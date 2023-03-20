import { createAction, createReducer } from "@reduxjs/toolkit";
import { message } from "antd";

export const registerUser = createAction("REGISTER_USER"); //REGISTER
export const loginUser = createAction("LOGIN_USER"); //LOGIN
export const logoutUser = createAction("LOGOUT_USER"); //LOGOUT
export const setUserDetails = createAction("GET_USER_DETAILS");
export const addFavorite = createAction("ADD_FAVORITES");
export const removeFavorite = createAction("REMOVE_FAVORITES");

const initialState = {
  users: {},
  user: {
    favorites_Show: [],
    favorites_Movie: [],
  },
};

const reducer = createReducer(initialState, {
  [registerUser]: (state, action) => {
    const newUser = action.payload;
    state.users = { ...state.users, newUser };
    state.user = { newUser };
  },
  [loginUser]: (state, action) => {
    const user = action.payload;
    state.user = user;
  },
  [logoutUser]: (state, action) => {
    state.user = {};
  },
  [setUserDetails]: (state, action) => {
    state.user = action.payload;
  },
  [addFavorite]: (state, action) => {
    if (!state.user.email) {
      message.error(`To add a favorite you need to be logged in.`);
      return;
    }
    let id = action.payload[0];
    let type = action.payload[1];

    if (type === "movie") {
      if (
        state.user.favorites_Movie.find((fav) => fav.id === id)
      ) {
        message.error(`Item already in favorites`);
      } else {
        state.user.favorites_Movie.push(id);
        message.success(`Item added to favorites`);
      }
    }

    if (type=== "tv") {
      if (
        state.user.favorites_Show.find((fav) => fav.id === id)
      ) {
        message.error(`Item already in favorites`);
      } else {
        state.user.favorites_Show.push(id);
        message.success(`Item added to favorites`);
      }
    }
  },
  [removeFavorite]: (state, action) => {
    state.user.favorites_Show = state.user.favorites_Show.filter(
      (item) => item !== action.payload.toString()
    );
    state.user.favorites_Movie = state.user.favorites_Movie.filter(
      (item) => item !== action.payload.toString()
    );
    message.success(`Item removed to favorites`);
  },
});

export default reducer;
