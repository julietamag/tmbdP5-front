import React from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

export const Error = () => {
  return (
    <div className="d-flex w-100 flex-column justify-content-center align-items-center mt-5">
      <h1>404</h1>
      <h3>Not Found</h3>
      <img
        src="https://assets.stickpng.com/thumbs/5ee772d099588c0004aa684b.png"
        alt="cat"
        width={300}
        height={300}
      ></img>
      <Link to="/">
        <button type="button" className="btn btn-primary">
          Back Home
          <IoHome />
        </button>
      </Link>
    </div>
  );
};
