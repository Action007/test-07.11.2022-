import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/components/EditProfile/EditProfile";

const MainPage = () => {
  const { t: translate } = useTranslation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{translate("editProfilePage.editProfile")}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <EditProfile />
    </>
  );
};

export default MainPage;
