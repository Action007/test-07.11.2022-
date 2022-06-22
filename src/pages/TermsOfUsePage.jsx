import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TermsOfUse from "../components/components/TermsOfUse/TermsOfUse";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const TermsOfUsePage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("termOfUsePage.title")}</title>
        <meta property="og:title" content="Term of use" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Term of use" />
      </Helmet>
      <TermsOfUse />
    </>
  );
};

export default TermsOfUsePage;
