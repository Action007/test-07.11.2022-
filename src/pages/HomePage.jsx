import React from "react";
import { Helmet } from "react-helmet";
import HomeChecklistPage from "../components/components/HomeChecklistPage/HomeChecklistPage";

const API_KEY = process.env.REACT_APP_HOSTNAME;
const HomePage = () => (
  <>
    <Helmet>
      <title>Home Page Title</title>
      <meta property="og:title" content="Home Page Title" />
      <meta property="og:url" content={API_KEY} />
      <meta
        name="description"
        content="Description: We take measures to protect your sensitive personal information but
        cannot guarantee its security in transit or storage."
      />
      <meta property="og:site_name" content="Checklist" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
    </Helmet>
    <HomeChecklistPage />;
  </>
);

export default HomePage;
