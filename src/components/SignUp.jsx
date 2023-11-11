import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export const SignUp = () => {
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [signupError, setSignupError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: { email },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      navigate(`/confirmEmail/${username}`);
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-sm gap-y-8">
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
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="confirmPassword" className="font-semibold text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            className="border-neutral-300 border-2 bg-white px-1 py-1 rounded-xl"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            value={email}
            className="border-neutral-300 border-2 bg-transparent px-1 py-1 rounded-xl"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {signupError && (
          <div className="bg-red-200 text-red-600 py-4 px-3 rounded-md flex justify-between items-center">
            User Already Exists
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => setSignupError(false)}
              className="hover:cursor-pointer w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </div>
        )}
        <button
          className="bg-blue-500 text-white rounded-xl py-1 px-2 hover:bg-blue-600 font-semibold"
          type="submit"
        >
          Create Account
        </button>
      </form>
      <p className="w-full border-b-2 border-neutral-200 my-4 text-center relative">
        <span className="bg-white absolute -mt-3 text-neutral-400">or</span>
      </p>
      <button
        className="bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-300 rounded-xl py-1 px-2 font-semibold text-sm"
        onClick={() => navigate("/signin")}
      >
        Sign In
      </button>
    </div>
  );
};
