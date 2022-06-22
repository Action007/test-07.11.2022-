import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Contacts from "../components/components/Contacts/Contacts";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const ContactsPage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Contacts</title>
        <meta property="og:title" content="Contacts" />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content="Contacts" />
      </Helmet>
      <Contacts />
    </>
  );
};

export default ContactsPage;
