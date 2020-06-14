import React, { useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Signup from "./Signup";
import Account from "./Account";

const AccountDetails = () => {
  const session = useSelector((state) => state.session);
  const [isSignUp, SetIsSignUp] = useState(false);

  if (!session) {
    return isSignUp
      ? <Signup onLoginClicked={() => SetIsSignUp(false)} />
      : <Login onSignupClicked={() => SetIsSignUp(true)} />;
  }

  return <Account />;
};
export default AccountDetails;
