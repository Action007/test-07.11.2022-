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
            <Link to="/home">{translate("home")}</Link>
          </li>
          <li className="footer__item">
            <Link to="support">{translate("supportPage.title")}</Link>
          </li>

          <li className="footer__item">
            <Link to="popular-checklist">
              {translate("popularChecklistPage.title")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="privacy-policy">
              {translate("privacyPolicyPage.title")}
            </Link>
          </li>
        </ul>
        <ul className="footer__items">
          <li className="footer__item">
            <Link to="our-mission">{translate("ourMissionPage.title")}</Link>
          </li>
          <li className="footer__item">
            <Link to="terms-of-use">{translate("termOfUsePage.title")}</Link>
          </li>
          <li className="footer__item">
            <Link to="contacts">{translate("contactsPage.title")}</Link>
          </li>
        </ul>
        <Networks />
      </nav>
    </footer>
  );
};

export default Footer;
