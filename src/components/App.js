import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { NavBar } from "./NavBar";
import { Error } from "./Error";
import { Overview } from "../commons/Overview";
import { Profile } from "./Profile";
import { List } from "../commons/List";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/user";
import { UserOverview } from "../commons/UserOverview";
import { SearchResults } from "./SearchResults";
import Footer from "./Footer";


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setUserDetails(foundUser));
    }
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Routes>
        {/* USER ROUTES */}
        <Route path="/user/profile/:id" element={<Profile />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        {/* MOVIE ROUTES */}
        <Route path="/movie/search/*" element={<List type="movie" />} />
    
        {/* TV ROUTES */}
        <Route path="/tv/search/*" element={<List type="tv" />} />
       
        {/* SEARCH ROUTES */}
        <Route path= '/search' element={<SearchResults />} />
        <Route path= '/search/users' element={<SearchResults  />} />

        <Route path="/overview/users/:id" element={<UserOverview type="user" />} />
        <Route path="/overview/media/:id" element={<Overview />} />
        <Route path="/overview/:media/:id" element={<Overview />} />
        {/* OTHER ROUTES */}
        <Route path="/404" element={<Error />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};
