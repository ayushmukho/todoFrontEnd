import React, { useState } from "react";
import SignUp from "../components/Signup";
import SignIn from "../components/Login";

const Auth = () => {
  const [authState, setAuthState] = useState(true);
  return authState ? (
    <SignUp setAuthState={setAuthState} />
  ) : (
    <SignIn setAuthState={setAuthState} />
  );
};

export default Auth;
