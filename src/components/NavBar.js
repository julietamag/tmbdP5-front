import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user";
import { MdSubscriptions } from"react-icons/md";


export const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // LOGOUT
  function handleLogout(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/user/logout", {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" class="navbar-brand">
          <MdSubscriptions /> TMBD
          </Link>
        </div>
        <ul className=" navbar-nav mr-sm-2">
          <li className="nav-item">
            {user.email ? (
              <Link to={`/user/profile/${user.id}`}>
                <button className="btn btn-warning my-2 my-sm-0 mx-3  ">
                  PROFILE
                </button>
              </Link>
            ) : (
              <Link to="user/register">
                <button className="btn btn-outline-warning mx-3 my-2 my-sm-0 ">
                  REGISTER
                </button>
              </Link>
            )}
          </li>
          <li className="nav-item">
            {" "}
            <Link to="user/login">
              {user.email ? (
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              ) : (
                <button className="btn btn-warning my-2 my-sm-0 ">
                  LOGIN
                </button>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
