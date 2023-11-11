// import { logo } from "../assets/dataPartnersLogo";

import { useState } from "react";
import { SignIn } from "../components";
import { Outlet } from "react-router-dom";

export const AuthScreen = () => {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <img
          // src="http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_jo1tb3"
          alt="logo"
          src="https://res.cloudinary.com/therajatg/image/upload/v1699706739/dataPartnersLogo_sb4rgi.png"
          className="h-20 md:h-20 mb-8"
        />
        <Outlet />
      </div>
    </div>
  );
};
