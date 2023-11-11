import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";

export const ConfirmEmail = () => {
  const { authState, authDispatch } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const [confirtmationCode, setConfirmationCode] = useState();

  function listenToAutoSignInEvent() {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        const user = payload.data;
        authDispatch({ type: "USERNAME", payload: user.username });
        authDispatch({ type: "EMAIL", payload: user.attributes.email });
      } else if (event === "autoSignIn_failure") {
        navigate("/singin", { replace: true });
      }
    });
  }

  async function confirmEmail(e) {
    e.preventDefault();
    try {
      const res = await Auth.confirmSignUp(username, confirtmationCode);
      listenToAutoSignInEvent();
      navigate("/home", { replace: true });
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  const resendCodeHandler = async () => {
    const res = await Auth.resendSignUp(username);
  };

  return (
    <div className="flex flex-col w-full h-full max-w-[250px] gap-y-8">
      <h2 className="text-xl font-semibold">We Emailed You</h2>
      <p>
        Your code is on the way. To create the account, enter the code we
        emailed. It may take a few minutes to arrive.
      </p>
      <form
        className="flex flex-col w-full gap-y-4 h-full"
        onSubmit={confirmEmail}
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="confirmationCode" className="font-semibold text-sm">
            Confirmation Code
          </label>
          <input
            type="number"
            value={confirtmationCode}
            className="border-neutral-300 border-2 bg-white px-1 py-1 rounded-xl"
            id="confirmationCode"
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded-xl py-1 px-2 hover:bg-blue-600 font-semibold"
          type="submit"
        >
          Confirm
        </button>
        <button
          className="bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-300 rounded-xl py-1 px-2 font-semibold text-sm"
          type="button"
          onClick={resendCodeHandler}
          // onClick={() => navigate("/signup")}
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};
