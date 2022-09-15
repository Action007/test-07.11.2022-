import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HOSTNAME } from "../services";
import NotFound from "../components/components/NotFound/NotFound";

const NotFoundPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.notFound.title")}</title>
        <meta property="og:title" content={translate("seo.notFound.title")} />
        <meta property="og:url" content={HOSTNAME + pathname} />
        <meta name="description" content={translate("seo.notFound.desc")} />
        <meta
          property="og:description"
          content={translate("seo.notFound.desc")}
        />
      </Helmet>
      <NotFound />
    </>
  );
};
export default NotFoundPage;
