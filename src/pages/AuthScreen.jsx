// import { logo } from "../assets/dataPartnersLogo";

import { useState } from "react";
import { SignIn } from "../components";
import { Outlet } from "react-router-dom";

export const AuthScreen = () => {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src="/src/assets/dataPartnersLogo.png"
          alt="logo"
          className="h-10 md:h-20 mb-8"
        />
        <Outlet />
      </div>
    </div>
  );
};
