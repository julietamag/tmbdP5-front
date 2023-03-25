import React from "react";
import backgroungImage from '../../assets/pexels-pavel-danilyuk-7234214.jpg'
import { Login } from "./Login";

export const LoginView = () => {
  return (
    <div>
      <section className="vh-100" style={{ backgroundImage: `url(${backgroungImage})`, backgroundSize: 'cover' }}>
        <Login />
      </section>
    </div>
  );
};
