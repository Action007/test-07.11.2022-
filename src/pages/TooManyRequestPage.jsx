import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TooManyRequest from "../components/components/TooManyRequest/TooManyRequest";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const TooManyRequestPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.tooManyRequest.title")}</title>
        <meta
          property="og:title"
          content={translate("seo.tooManyRequest.title")}
        />
        <meta property="og:url" content={HOSTNAME + pathname} />
      </Helmet>
      <TooManyRequest />
    </>
  );
};
export default TooManyRequestPage;
