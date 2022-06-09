import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";
import MyProfileAwards from "./MyProfileAwards/MyProfileAwards";
import "./MyProfile.scss";

// import ProfileImg from "../../../assets/images/content/profile.png";

const Profile = () => {
  const { t: translate } = useTranslation();
  const user = useSelector((state) => state.authSliceReducer.user);
  const breadcrumbs = [{ title: translate("profilePage.myProfile") }];

  return (
    <div className="profile container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {user && (
        <MyProfileInfo
          name={user.name}
          nickname={user.nickname}
          country={user.country}
          bio={user.bio}
          website={user.site}
          facebook={user.facebook}
          twitter={user.twitter}
          instagram={user.instagram}
        />
      )}
      {user && (
        <MyProfileAwards
          completedCounter={user.completed_counter}
          createdCounter={user.created_counter}
          awardsCounter={user.awards_counter}
        />
      )}
    </div>
  );
};

export default Profile;
