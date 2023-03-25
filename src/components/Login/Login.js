import React from "react";
import { loginUser } from "../../store/user";
import { useDispatch } from "react-redux";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

export const Login = () => {
  const email = useInput();
  const password = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    //LOGIN USER
    axios
      .post(
        "https://tmdb-yax5.onrender.com/api/user/login",
        {
          email: email.value,
          password: password.value,
        },
        {
          //AxiosRequestConfig parameter
          withCredentials: true, //correct
        }
      )
      .then((res) => {
        dispatch(loginUser(res.data));
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        toast.error("Login failed!");
        console.error(err)});
  }

  return (
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-12 col-xl-11">
          <div
            className="card text-black"
            style={{ borderRadius: "25px", marginTop: "5rem" }}
          >
            <div className="card-body p-md-4 ">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">
                    Login
                  </p>
                  <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          value={email.value}
                          onChange={email.onChange}
                        />
                        <label className="form-label" htmlFor="form3Example3c">
                          Email
                        </label>
                      </div>
                    </div>
                    
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          value={password.value}
                          onChange={password.onChange}
                        />
                        <label className="form-label" htmlFor="form3Example4c">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center mb-4">
                    <button className="button-17">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
