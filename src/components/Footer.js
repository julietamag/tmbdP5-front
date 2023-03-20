import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white mt-5 mt-auto fixed-bottom ">
      <div className="container text-center">
        <p >
          Copyright &copy; 2023
        </p>
          <Link to="/" className="text-light">TMBD</Link>
      </div>
    </footer>
  );
};

export default Footer;
