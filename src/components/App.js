import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Home";
import { NavBar } from "./NavBar";
import { Error } from "./Error";
import { Overview } from "../commons/Overview";
import { Profile } from "./Profile";
import { List } from "../commons/List";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/user";
import { UserOverview } from "../commons/UserOverview";
import { SearchResults } from "./SearchResults";
import { RegisterView } from "./Register/RegisterView";
import { LoginView } from "./Login/LoginView";
import { Toaster } from "react-hot-toast";


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
    <div style={{backgroundColor: '#040A10'}}>
      <div><Toaster/></div>
      <NavBar />
      <Routes>
        {/* USER ROUTES */}
        <Route path="/user/profile/:id" element={<Profile />} />
        <Route path="/user/register" element={<RegisterView />} />
        <Route path="/user/login" element={<LoginView />} />
        {/* MOVIE ROUTES */}
        <Route path="/movie/search/*" element={<List type="movie" />} />
    
        {/* TV ROUTES */}
        <Route path="/tv/search/*" element={<List type="tv" />} />
       
        {/* SEARCH ROUTES */}
        <Route path= '/search/tv' element={<SearchResults  type="tv" />} />
        <Route path= '/search/movie' element={<SearchResults type="movie" />} />
        <Route path= '/search/users' element={<SearchResults  />} />
        <Route path="/overview/users/:id" element={<UserOverview type="user" />} />
        <Route path="/overview/media/:id" element={<Overview />} />
        <Route path="/overview/:media/:id" element={<Overview />} />
        {/* OTHER ROUTES */}
        <Route path="/404" element={<Error />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
