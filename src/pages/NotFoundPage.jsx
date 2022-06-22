import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NotFound from "../components/components/NotFound/NotFound";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const NotFoundPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  <>
    <Helmet>
      <title>{translate("error.notFound")}</title>
      <meta property="og:title" content="Page Not Found" />
      <meta property="og:url" content={API_KEY + pathname} />
      <meta name="description" content="Page Not Found" />
    </Helmet>
    <NotFound />
  </>;
};
export default NotFoundPage;
