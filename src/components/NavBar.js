import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user";
import { MdSubscriptions } from"react-icons/md";


export const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // LOGOUT
  function handleLogout(e) {
    e.preventDefault();
    axios
      .post("https://tmdb-yax5.onrender.com/api/user/logout", {
        //AxiosRequestConfig parameter
        withCredentials: true, //correct
      })
      .then(() => {
        document.cookie =
          "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=localhost;path=/;";
        dispatch(logoutUser());
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        navigate("/404");
      });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <MdSubscriptions /> TMBD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggle}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen && "show"} `} id="navbarNav">
          <ul className="navbar-nav ml-auto d-inline-flex justify-content-end align-items-end w-100 m-2">
            <li className="nav-item mx-3">
              {user.email ? (
                <Link to={`/user/profile/${user.id}`}>
                  <button className="btn btn-light ">PROFILE</button>
                </Link>
              ) : (
                <Link to="user/register">
                  <button className="btn btn-outline-light ">REGISTER</button>
                </Link>
              )}
            </li>
            <li className="nav-item mx-3">
              <Link to="user/login ">
                {user.email ? (
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                ) : (
                  <button className="btn btn-light">LOGIN</button>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}