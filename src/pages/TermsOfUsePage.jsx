import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import TermsOfUse from "../components/components/TermsOfUse/TermsOfUse";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const TermsOfUsePage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Term of use</title>
        <meta property="og:title" content="Term of use" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Term of use" />
      </Helmet>
      <TermsOfUse />
    </>
  );
};

export default TermsOfUsePage;
