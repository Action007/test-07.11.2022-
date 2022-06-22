import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MyProfile from "../components/components/MyProfile/MyProfile";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const MyProfilePage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{translate("profilePage.myProfile")}</title>
        <meta property="og:title" content="My profile" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="My profile" />
      </Helmet>
      <MyProfile />
    </>
  );
};

export default MyProfilePage;
