import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../../../store/authSlice";
import { useConfirmAccountMutation } from "../../../../services/logInService";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";

const ConfirmAccount = () => {
  const [confirmAccount, { data, isSuccess, isError }] =
    useConfirmAccountMutation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const confirmToken = searchParams.get("confirmation_token");

  useEffect(() => {
    if (!confirmToken) navigate("/not-found");
    if (confirmToken) confirmAccount({ confirmation_token: confirmToken });
  }, []);

  useEffect(() => {
    if (isSuccess) dispatch(authSliceActions.setToken(data.token));
    if (isError) navigate("/error");
  }, [isSuccess, isError]);

  return <LoadingSpinner />;
};

export default ConfirmAccount;
