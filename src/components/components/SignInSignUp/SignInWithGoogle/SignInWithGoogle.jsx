import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../../../store/authSlice";
import { useSignInWithGoogleMutation } from "../../../../services/logInService";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";

const SignInWithGoogle = () => {
  const [signInWithGoogle, { data, isSuccess, isError }] =
    useSignInWithGoogleMutation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const state1 = searchParams.get("state");
  const code = searchParams.get("code");
  const scope = searchParams.get("scope");
  const authuser = searchParams.get("authuser");
  const prompt = searchParams.get("prompt");

  const token = useSelector((state) => state.authSliceReducer.token);
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  useEffect(() => {
    const state = { state: state1, code, scope, authuser, prompt };
    signInWithGoogle(state);
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/error", { replace: true });
    }
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(authSliceActions.setToken(data.token));
  }, [isSuccess]);

  return <LoadingSpinner />;
};

export default SignInWithGoogle;
