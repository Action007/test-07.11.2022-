import React from "react";
import { useTranslation } from "react-i18next";
import "./ProgressBarHeader.scss";

const ProgressBarHeader = ({ done }) => {
  const { t: translate } = useTranslation();

  return (
    <div className="progressBar-header">
      <div
        className="progressBar-header__done"
        style={{
          opacity: 1,
          width: `${done}%`,
        }}
      >
        <span className="progressBar-header__text SFPro-400">
          {translate("header.activeChecklist")}
        </span>
      </div>
    </div>
  );
};

export default ProgressBarHeader;
