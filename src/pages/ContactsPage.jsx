import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Contacts from "../components/components/Contacts/Contacts";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const ContactsPage = () => {
  const { t: translate } = useTranslation();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{translate("seo.contacts.title")}</title>
        <meta property="og:title" content={translate("seo.contacts.title")} />
        <meta property="og:url" content={API_KEY + pathname} />
        <meta name="description" content={translate("seo.contacts.desc")} />
        <meta
          property="og:description"
          content={translate("seo.contacts.desc")}
        />
      </Helmet>
      <Contacts />
    </>
  );
};

export default ContactsPage;
