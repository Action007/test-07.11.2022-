import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../../../store/authSlice";
import { useConfirmAccountMutation } from "../../../../services/logInService";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import PopupDone from "../../PopupDone/PopupDone";
import isServerError from "../../../../utils/isServerError";

const ConfirmAccount = () => {
  const [confirmAccount, { data, isSuccess, error }] =
    useConfirmAccountMutation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const confirmToken = searchParams.get("confirmation_token");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (!confirmToken) navigate("/not-found", { replace: true });
    if (confirmToken) confirmAccount({ confirmation_token: confirmToken });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(authSliceActions.setToken(data.token));
      setModalShow(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!error) return;
    if (error?.data?.error === "retry_later") {
      navigate("/too-many-request");
    }
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
    }
  }, [error]);

  return (
    <>
      <PopupDone
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/");
        }}
        page="confirmation"
      />
      <LoadingSpinner />;
    </>
  );
};

export default ConfirmAccount;
