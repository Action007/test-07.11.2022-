import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SignInSignUp from "../components/components/SignInSignUp/SignInSignUp";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const SignUpPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/not-found");
  }, [token]);

  return (
    <>
      <Helmet>
        {pathname === "/sign-in" && <title>Sign In</title>}
        {pathname === "/sign-in" && (
          <meta name="description" content="Sign In" />
        )}
        {pathname === "/sign-up" && <title>Sign Up</title>}
        {pathname === "/sign-up" && (
          <meta name="description" content="Sign Up" />
        )}
        {pathname === "/sign-in/reset-password" && (
          <title>Reset Password</title>
        )}
        {pathname === "/sign-in/reset-password" && (
          <meta name="description" content="Reset Password" />
        )}
        {pathname === "/sign-in/reset" && <title>Forgot Password</title>}
        {pathname === "/sign-in/reset" && (
          <meta name="description" content="Forgot Password" />
        )}
        <meta property="og:url" content={API_KEY + pathname} />
      </Helmet>
      <SignInSignUp pathname={pathname} />
    </>
  );
};

export default SignUpPage;
