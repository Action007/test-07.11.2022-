import React from "react";
import "./ProgressBarHeader.scss";

const ProgressBarHeader = ({ done }) => {
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
          Active checklist
        </span>
      </div>
    </div>
  );
};

export default ProgressBarHeader;
