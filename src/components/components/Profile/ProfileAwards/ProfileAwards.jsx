import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import CreateButton from "../../../UI/Buttons/CreateButton/CreateButton";
import "./ProfileAwards.scss";

import { ReactComponent as ListSvg } from "../../../../assets/images/icon/list.svg";
import { ReactComponent as CupSvg } from "../../../../assets/images/icon/cup.svg";
import { ReactComponent as AddedSvg } from "../../../../assets/images/icon/added.svg";
import { ReactComponent as EmptySvg } from "../../../../assets/images/icon/emptyAwards.svg";

const ProfileAwards = ({ completedCounter, createdCounter, awardsCounter }) => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="profile-awards__wrap">
      <span className="profile-awards__head">
        {pathname === "/my-profile"
          ? translate("profilePage.myAwards")
          : translate("profilePage.awards")}
      </span>
      {!!completedCounter || !!createdCounter || !!awardsCounter ? (
        <ul className="profile-awards__items">
          {!!completedCounter && (
            <li className="profile-awards__item SFPro-600">
              <div className="profile-awards__svg">
                <ListSvg />
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
                <CupSvg />
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
                <AddedSvg />
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
      ) : (
        <div className="profile-awards__empty">
          <div className="profile-awards__inner">
            <EmptySvg />
            <span className="profile-awards__span SFPro-600">
              {pathname === "/my-profile"
                ? translate("profilePage.myEmptyAwards")
                : translate("profilePage.emptyAwards")}
            </span>
          </div>
          {pathname === "/my-profile" && <CreateButton />}
        </div>
      )}
    </div>
  );
};

export default ProfileAwards;
