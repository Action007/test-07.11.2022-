import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import OurMission from "../components/components/OurMission/OurMission";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const OurMissionPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.ourMission.title")}</title>
        <meta property="og:title" content={translate("seo.ourMission.title")} />
        <meta property="og:url" content={HOSTNAME + pathname} />
        <meta name="description" content={translate("seo.ourMission.desc")} />
        <meta
          property="og:description"
          content={translate("seo.ourMission.desc")}
        />
      </Helmet>
      <OurMission />
    </>
  );
};
export default OurMissionPage;
