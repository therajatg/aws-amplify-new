import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export const SignIn = () => {
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      authDispatch({ type: "USERNAME", payload: username });
      authDispatch({ type: "EMAIL", payload: user.attributes.email });
      navigate("/home", { replace: true });
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-[250px] gap-y-8">
      <form
        className="flex flex-col w-full gap-y-6 h-full"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="username" className="font-semibold text-sm">
            Username
          </label>
          <input
            type="text"
            value={username}
            className="border-neutral-300 border-2 bg-white px-1 py-1 rounded-xl"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="font-semibold text-sm">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="border-neutral-300 border-2 bg-transparent px-1 py-1 rounded-xl"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          {/* <span
            className="text-blue-600 text-xs font-semibold"
            onClick={forgotPasswordHandler}
          >
            Forgot Password?
          </span> */}
        </div>
        <button
          className="bg-blue-500 text-white rounded-xl py-1 px-2 hover:bg-blue-600 font-semibold"
          type="submit"
        >
          Continue
        </button>
      </form>
      <p className="w-full border-b-2 border-neutral-200 my-4 text-center relative">
        <span className="bg-white absolute -mt-3 text-neutral-400">or</span>
      </p>
      <button
        className="bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-300 rounded-xl py-1 px-2 font-semibold text-sm"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
};
