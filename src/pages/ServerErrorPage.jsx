import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ServerError from "../components/components/ServerError/ServerError";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const ServerErrorPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("error.error")}</title>
        <meta property="og:title" content="Server Error" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Server Error" />
      </Helmet>
      <ServerError />
    </>
  );
};
export default ServerErrorPage;
