import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileAwards from "./ProfileAwards/ProfileAwards";
import ProfileSkeleton from "../../UI/ProfileSkeleton/ProfileSkeleton";
import "./Profile.scss";
import Notification from "../../UI/Notification/Notification";

const Profile = ({ user, isLoading }) => {
  const [showError, setShowError] = useState(false);
  const { pathname } = useLocation();
  const { t: translate } = useTranslation();

  const breadcrumbs = [
    {
      title:
        pathname === "/my-profile"
          ? translate("profilePage.myProfile")
          : translate("profilePage.profile"),
    },
  ];

  const onLargeImageSize = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  return (
    <>
      {showError && (
        <Notification translate={translate("profilePage.2mb")} isError />
      )}
      <div className={`profile container${showError ? " show" : ""}`}>
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
              linkedin={user.linkedin}
              avatar_url={user.avatar_url}
              onLargeImageSize={onLargeImageSize}
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
