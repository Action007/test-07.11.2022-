import React from "react";
import "./ProgressBarHeader.scss";

const ProgressBarHeader = ({ done = 0 }) => {
  return (
    <div className="progressBar">
      <div
        className="progressBar__done"
        style={{
          opacity: 1,
          width: `${done}%`,
        }}
      >
        <span className="progressBar__text">Active checklist</span>
      </div>
    </div>
  );
};

export default ProgressBarHeader;
