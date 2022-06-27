import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MyProfile from "../components/components/MyProfile/MyProfile";

const MyProfilePage = () => {
  const { t: translate } = useTranslation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{translate("profilePage.myProfile")}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <MyProfile />
    </>
  );
};

export default MyProfilePage;
