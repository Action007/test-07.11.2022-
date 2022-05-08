import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInSignUp from "../components/components/SignInSignUp/SignInSignUp";

const SignUpPage = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/not-found");
  }, [token]);

  return <SignInSignUp />;
};

export default SignUpPage;
