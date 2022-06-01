import React from "react";
import { useTranslation } from "react-i18next";
import "./MyProfileAwards.scss";

import { ReactComponent as List } from "../../../../assets/images/icon/list.svg";
import { ReactComponent as Cup } from "../../../../assets/images/icon/cup.svg";
import { ReactComponent as Added } from "../../../../assets/images/icon/added.svg";

const MyProfileAwards = ({
  completedCounter,
  createdCounter,
  awardsCounter,
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className="profile-awards__wrap">
      <span className="profile-awards__head">
        {translate("profilePage.myAwards")}
      </span>
      <ul className="profile-awards__items">
        {!!completedCounter && (
          <li className="profile-awards__item SFPro-600">
            <div className="profile-awards__svg">
              <List />
            </div>
            <div>
              <span className="profile-awards__num SFPro-700">
                {completedCounter}
              </span>
              <div className="profile-awards__desc">
                {translate("profilePage.completedChecklists")}
              </div>
            </div>
          </li>
        )}
        {!!awardsCounter && (
          <li className="profile-awards__item SFPro-600">
            <div className="profile-awards__svg">
              <Cup />
            </div>
            <div>
              <span className="profile-awards__num SFPro-700">
                {awardsCounter}
              </span>
              <div className="profile-awards__desc">
                {translate("profilePage.myAwards")}
              </div>
            </div>
          </li>
        )}
        {!!createdCounter && (
          <li className="profile-awards__item SFPro-600">
            <div className="profile-awards__svg">
              <Added />
            </div>
            <div>
              <span className="profile-awards__num SFPro-700">
                {createdCounter}
              </span>
              <div className="profile-awards__desc">
                {translate("profilePage.createdChecklists")}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MyProfileAwards;
