import React from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import "./ComplainDropdown.scss";

import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";
import { ReactComponent as ComplainSvg } from "../../../assets/images/icon/complain.svg";

const ComplainDropdown = ({ setShowComplain }) => {
  const { ref, show, setShowHandler } = useClickOutside();

  return (
    <div className="complain-dropdown SFPro-500" ref={ref}>
      <button
        onClick={setShowHandler}
        className="complain-dropdown__info"
        type="button"
      >
        <InfoSvg />
      </button>
      {show && (
        <div className="complain-dropdown__buttons">
          <button
            onClick={() => setShowComplain(true)}
            className="complain-dropdown__button"
            type="button"
          >
            <ComplainSvg />
            Complain
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplainDropdown;
