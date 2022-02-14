import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Footer.scss";

import Logo from "../../../assets/images/content/logo.svg";
import Networks from "../Networks/Networks";

const Footer = () => {
  const { t: translate } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__img">
        <img src={Logo} alt="Logotype" />
      </div>
      <nav className="footer__nav">
        <ul className="footer__items mb-0">
          <li className="footer__item">
            <Link to="/">{translate("home")}</Link>
          </li>
          <li className="footer__item">
            <Link to="Support">{translate("supportPage.title")}</Link>
          </li>
          <li className="footer__item">
            <Link to="Popular-Checklist">
              {translate("popularChecklistPage.title")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="Privacy-Policy">
              {translate("privacyPolicyPage.title")}
            </Link>
          </li>
        </ul>
        <ul className="footer__items">
          <li className="footer__item">
            <Link to="Our-Mission">{translate("ourMissionPage.title")}</Link>
          </li>
          <li className="footer__item">
            <Link to="Terms-Of-Use">{translate("termOfUsePage.title")}</Link>
          </li>
          <li className="footer__item">
            <Link to="Contacts">{translate("contactsPage.title")}</Link>
          </li>
        </ul>
        <Networks />
      </nav>
    </footer>
  );
};

export default Footer;
