import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../services/checklistService";
import Profile from "../components/components/Profile/Profile";

const ProfilePage = () => {
  const { t: translate } = useTranslation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();
  const { nickname } = useParams();
  const { pathname } = useLocation();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = checklistAPI.useFetchUserProfileQuery(nickname, {
    skip: !nickname,
  });
  const myProfile = useSelector((state) => state.authSliceReducer.user);

  useEffect(() => {
    if (error && error?.data?.message[0]?.type === "invalid") {
      navigate("/not-found");
    } else if (isError) {
      navigate("/error");
    }
  }, [isError]);

  useEffect(() => {
    if (!token && !nickname) navigate("/sign-in");
    if (nickname && isError) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>
          {pathname === "/my-profile"
            ? translate("profilePage.myProfile")
            : `${translate("profilePage.profile")} | ${nickname}`}
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {nickname && <Profile user={user} isLoading={isLoading} />}
      {!nickname && <Profile user={myProfile} isLoading={!myProfile} />}
    </>
  );
};

export default ProfilePage;
