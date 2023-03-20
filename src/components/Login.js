import React from "react";
import { loginUser } from "../store/user";
import { useDispatch } from "react-redux";
import { useInput } from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router";

export const Login = () => {
  const email = useInput();
  const password = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  function handleLogin(e) {
    e.preventDefault();
    //LOGIN USER
    axios
      .post("http://localhost:3001/api/user/login",{
        email: email.value,
        password: password.value,
      }, {
        //AxiosRequestConfig parameter
        withCredentials: true //correct
      })
      .then((res) => {
        dispatch(loginUser(res.data));
  
        localStorage.setItem('user',JSON.stringify(res.data))
        navigate('/')
      })
      .catch((err) => console.error(err));
  }
 
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    onChange={email.onChange}
                    value={email.value}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    onChange={password.onChange}
                    value={password.value}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 
};
