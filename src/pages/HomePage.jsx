import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import HomeChecklistPage from "../components/components/HomeChecklistPage/HomeChecklistPage";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const HomePage = () => {
  const { t: translate } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.home.title")}</title>
        <meta property="og:title" content={translate("seo.home.title")} />
        <meta property="og:url" content={API_KEY} />
        <meta name="description" content={translate("seo.home.desc")} />
        <meta property="og:description" content={translate("seo.home.desc")} />
        <link rel="canonical" href={API_KEY} />
      </Helmet>
      <HomeChecklistPage />
    </>
  );
};

export default HomePage;
