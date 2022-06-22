import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Support from "../components/components/Support/Support";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const SupportPage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Support</title>
        <meta property="og:title" content="Support" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Support" />
      </Helmet>
      <Support />
    </>
  );
};

export default SupportPage;
