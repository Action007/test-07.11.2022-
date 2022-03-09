import React from "react";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../../../hooks/useClickOutside";
import "./ComplainDropdown.scss";

import { ReactComponent as InfoSvg } from "../../../assets/images/icon/info.svg";

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
      <CSSTransition
        classNames="complainDropdown"
        in={show}
        timeout={300}
        unmountOnExit
      >
        <button
          onClick={() => setShowComplain(true)}
          className="complain-dropdown__button"
          type="button"
        >
          Complain
        </button>
      </CSSTransition>
    </div>
  );
};

export default ComplainDropdown;
