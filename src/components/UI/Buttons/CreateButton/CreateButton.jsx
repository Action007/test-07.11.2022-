import React from "react";
import "./CreateButton.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as Plus } from "../../../../assets/images/icon/plus.svg";

const CreateButton = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const { t: translate } = useTranslation();

  return (
    <Link
      to={token ? `/creation-of-checklist` : `/sign-in`}
      className="create-button SFPro-600"
      type="button"
    >
      <Plus />
      {translate("mainPage.button")}
    </Link>
  );
};

export default CreateButton;
