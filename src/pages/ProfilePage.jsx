import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../services/checklistService";
import Profile from "../components/components/Profile/Profile";

const ProfilePage = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { nickname } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = checklistAPI.useFetchUserProfileQuery(nickname);

  useEffect(() => {
    if (error && error?.data?.message[0]?.type === "invalid") {
      navigate("/not-found");
    } else if (isError) {
      navigate("/error");
    }
  }, [isError]);

  return (
    <>
      <Helmet>
        <title>
          {user && user.is_current_user
            ? `${translate("profilePage.myProfile")} | ${nickname}`
            : `${translate("profilePage.profile")} | ${nickname}`}
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Profile user={user} isLoading={isLoading} />
    </>
  );
};

export default ProfilePage;
