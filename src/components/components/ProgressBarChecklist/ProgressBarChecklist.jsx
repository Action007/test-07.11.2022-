import React from "react";
import { useTranslation } from "react-i18next";
import "./ProgressBarChecklist.scss";

import { ReactComponent as FlagSvg } from "../../../assets/images/icon/flag.svg";

const ProgressBarChecklist = ({ done }) => {
  const { t: translate } = useTranslation();

  return (
    <div className="progressBar-checklist">
      <div className="progressBar-checklist__wrap SFPro-700">
        <span>
          {translate("progress")} {done}% {translate("complete")}
        </span>
        <span className="progressBar-checklist__flag">
          Finish
          <FlagSvg />
        </span>
      </div>
      <div className="progressBar-checklist__wrapper">
        <div
          className="progressBar-checklist__done"
          style={{
            opacity: 1,
            width: `${done}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBarChecklist;
