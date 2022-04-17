import React from "react";
import "./CreateButton.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Plus } from "../../../../assets/images/icon/plus.svg";

const CreateButton = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/creation-of-checklist`)}
      className="create-button SFPro-600"
      type="button"
    >
      <Plus />
      {translate("mainPage.button")}
    </button>
  );
};

export default CreateButton;
