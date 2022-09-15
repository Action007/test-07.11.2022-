import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HOSTNAME } from "../services";
import Support from "../components/components/Support/Support";

const SupportPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.support.title")}</title>
        <meta property="og:title" content={translate("seo.support.title")} />
        <meta property="og:url" content={HOSTNAME + pathname} />
        <meta name="description" content={translate("seo.support.desc")} />
        <meta
          property="og:description"
          content={translate("seo.support.desc")}
        />
      </Helmet>
      <Support />
    </>
  );
};

export default SupportPage;
