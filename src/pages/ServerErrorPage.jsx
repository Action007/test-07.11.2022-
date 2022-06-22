import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import ServerError from "../components/components/ServerError/ServerError";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const ServerErrorPage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Server Error</title>
        <meta property="og:title" content="Server Error" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Server Error" />
      </Helmet>
      <ServerError />
    </>
  );
};
export default ServerErrorPage;
