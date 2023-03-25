import React from "react";
import { Register } from "./Register";
import backgroungImage from '../../assets/pexels-pavel-danilyuk-7234214.jpg'

export const RegisterView = () => {
  return (
    <div>
      <section className="vh-100" style={{ backgroundImage: `url(${backgroungImage})`, backgroundSize: 'cover' }}>
        <Register />
      </section>
    </div>
  );
};
