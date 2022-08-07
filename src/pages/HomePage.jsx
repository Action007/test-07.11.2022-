import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import HomeChecklistPage from "../components/components/HomeChecklistPage/HomeChecklistPage";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const HomePage = () => {
  const { t: translate } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.home.title")}</title>
        <meta property="og:title" content={translate("seo.home.title")} />
        <meta property="og:url" content={HOSTNAME} />
        <meta name="description" content={translate("seo.home.desc")} />
        <meta property="og:description" content={translate("seo.home.desc")} />
        <link rel="canonical" href={HOSTNAME} />
      </Helmet>
      <HomeChecklistPage />
    </>
  );
};

export default HomePage;
