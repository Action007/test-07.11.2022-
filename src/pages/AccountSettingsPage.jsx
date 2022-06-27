import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountSetting from "../components/components/AccountSetting/AccountSetting";

const AccountSettingsPage = () => {
  const { t: translate } = useTranslation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{translate("accountSettings.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AccountSetting />
    </>
  );
};

export default AccountSettingsPage;
