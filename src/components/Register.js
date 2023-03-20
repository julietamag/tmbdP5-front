import React, { useState } from "react";
import { registerUser } from "../store/user";
import { useDispatch } from "react-redux";
import { useInput } from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router";

export const Register = () => {
  const email = useInput();
  const password = useInput();
  const lastName = useInput();
  const name = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [alertMessage, setAlertMessage] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    //REGISTER NEW USER
    axios
      .post("http://localhost:3001/api/user/register", {
        email: email.value,
        password: password.value,
        name: name.value,
        lastName: lastName.value,
      })
      .then((res) => {
        dispatch(registerUser({
          email: email.value,
          password: password.value,
          name: name.value,
          lastName: lastName.value
        }));
        setAlertMessage("Registration successful!");
        setTimeout(() => {
          navigate('/')
        }, 1000)
      })
      .catch((err) => {
        console.error(err)
        navigate('/404')
      });
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Register</h1>
      {alertMessage && (
        <div className="alert alert-success" role="alert">
          {alertMessage} 
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                placeholder="Name"
                onChange={name.onChange}
                value={name.value}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                required
                placeholder="Last Name"
                onChange={lastName.onChange}
                value={lastName.value}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                placeholder="Email"
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
                placeholder="Password"
                onChange={password.onChange}
                value={password.value}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};