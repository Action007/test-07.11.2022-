import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileAwards from "./ProfileAwards/ProfileAwards";
import ProfileSkeleton from "../../UI/ProfileSkeleton/ProfileSkeleton";
import "./Profile.scss";

const Profile = ({ user, isLoading }) => {
  const [showError, setShowError] = useState("");
  const { pathname } = useLocation();
  const { t: translate } = useTranslation();

  const breadcrumbs = [
    {
      title:
        // eslint-disable-next-line no-nested-ternary
        pathname === "/my-profile"
          ? translate("profilePage.myProfile")
          : translate("profilePage.profile"),
    },
  ];

  const checkErrorHandler = () => {
    setShowError("show");
    setTimeout(() => setShowError(""), 8000);
  };

  return (
    <>
      {showError && (
        <div className="error SFPro-500">{translate("profilePage.2mb")}</div>
      )}
      <div className={`profile container ${showError}`}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {user && (
          <>
            <ProfileInfo
              name={user.name}
              nickname={user.nickname}
              country={user.country}
              bio={user.bio}
              website={user.site}
              facebook={user.facebook}
              twitter={user.twitter}
              instagram={user.instagram}
              avatar_url={user.avatar_url}
              errorSize={checkErrorHandler}
            />
            <ProfileAwards
              completedCounter={user.completed_counter}
              createdCounter={user.created_counter}
              awardsCounter={user.awards_counter}
            />
          </>
        )}
        {isLoading && <ProfileSkeleton />}
      </div>
    </>
  );
};

export default Profile;
