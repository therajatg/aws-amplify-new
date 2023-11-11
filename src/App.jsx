// import logo from "./logo.svg";
// import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
//   Button,
//   Heading,
//   Image,
//   View,
//   Card,
// } from "@aws-amplify/ui-react";
// import logo from "./assets/react.svg";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import {
  SignIn,
  SignUp,
  ConfirmEmail,
  SetNewPassword,
  ResetPassword,
} from "./components/index";
import { AuthScreen } from "./pages/AuthScreen";
import { Home } from "./pages/Home";
import { useAuth } from "./contexts/authContext";

export const App = () => {
  const { authState } = useAuth();

  return (
    <div className="w-full p-4 h-full">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        <Route
          path="/"
          element={authState.user.username ? <Home /> : <AuthScreen />}
        >
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirmEmail/:username" element={<ConfirmEmail />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};
