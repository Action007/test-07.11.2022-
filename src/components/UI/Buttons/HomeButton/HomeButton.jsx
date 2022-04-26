import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/`)}
      className="checklist-button SFPro-600"
      type="button"
    >
      {translate("error.button")}
    </button>
  );
};

export default HomeButton;
