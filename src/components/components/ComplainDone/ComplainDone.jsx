import React from "react";
import "./ComplainDone.scss";

import { ReactComponent as CloseSvg } from "../../../assets/images/icon/close.svg";
import { ReactComponent as DoneSvg } from "../../../assets/images/content/supportDone.svg";

const ComplainDone = ({ closeHandler, translate }) => {
  return (
    <div className="complain-done">
      <button
        className="complain-done__btn"
        onClick={closeHandler}
        type="button"
      >
        <CloseSvg />
      </button>
      <div className="complain-done__wrapper">
        <div className="complain-done__wrap">
          <h3 className="complain-done__title SFPro-600">
            {translate("supportDone.title")}
          </h3>
          <span className="complain-done__subtitle">
            {translate("supportDone.subtitle")}
          </span>
        </div>
        <div className="complain-done__img">
          <DoneSvg />
        </div>
      </div>
    </div>
  );
};

export default ComplainDone;
