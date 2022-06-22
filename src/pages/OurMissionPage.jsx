import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import OurMission from "../components/components/OurMission/OurMission";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const OurMissionPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("ourMissionPage.title")}</title>
        <meta property="og:title" content="Our mission" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Our mission" />
      </Helmet>
      <OurMission />
    </>
  );
};
export default OurMissionPage;
