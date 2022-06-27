import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import PrivacyPolicy from "../components/components/PrivacyPolicy/PrivacyPolicy";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const PrivacyPolicyPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.privacyPolicy.title")}</title>
        <meta
          property="og:title"
          content={translate("seo.privacyPolicy.title")}
        />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta
          name="description"
          content={translate("seo.privacyPolicy.desc")}
        />
        <meta
          property="og:description"
          content={translate("seo.privacyPolicy.desc")}
        />
      </Helmet>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
