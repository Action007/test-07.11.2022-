import React from "react";
import "./CreateButton.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as Plus } from "../../../../assets/images/icon/plus.svg";

const CreateButton = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (token) navigate(`/creation-of-checklist`);
    if (!token) navigate(`/sign-in`);
  };

  return (
    <button
      onClick={onClickHandler}
      className="create-button SFPro-600"
      type="button"
    >
      <Plus />
      {translate("mainPage.button")}
    </button>
  );
};

export default CreateButton;
