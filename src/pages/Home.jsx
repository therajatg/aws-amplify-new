import { Auth, Hub } from "aws-amplify";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      await Auth.signOut();
      authDispatch({ type: "USERNAME", payload: null });
      authDispatch({ type: "EMAIL", payload: null });
      navigate("/", { replace: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-y-4">
      <img
        // src="http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_jo1tb3"
        alt="logo"
        src="https://res.cloudinary.com/therajatg/image/upload/v1699706739/dataPartnersLogo_sb4rgi.png"
        className="h-20 md:h-20 mb-8"
      />
      <p className="font-semibold text-2xl">
        Welcome {authState.user.username}, Ciao
      </p>

      <button
        className="bg-blue-500 text-white rounded-xl py-1 px-2 hover:bg-blue-600 font-semibold"
        onClick={signOutHandler}
      >
        Sign Out
      </button>
    </div>
  );
};
