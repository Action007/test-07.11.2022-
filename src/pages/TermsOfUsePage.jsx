import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HOSTNAME } from "../services";
import TermsOfUse from "../components/components/TermsOfUse/TermsOfUse";

const TermsOfUsePage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.termsOfUse.title")}</title>
        <meta property="og:title" content={translate("seo.termsOfUse.title")} />
        <meta property="og:url" content={HOSTNAME + pathname} />
        <meta name="description" content={translate("seo.termsOfUse.desc")} />
        <meta
          property="og:description"
          content={translate("seo.termsOfUse.desc")}
        />
      </Helmet>
      <TermsOfUse />
    </>
  );
};

export default TermsOfUsePage;
