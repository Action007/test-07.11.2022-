import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Footer.scss";

import Logo from "../../../assets/images/icon/logo.svg";
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
            <Link to="/" type="button">
              {translate("home")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/support" type="button">
              {translate("supportPage.title")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/privacy-policy" type="button">
              {translate("privacyPolicyPage.title")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/?per_page=5&page=1&popular=true" type="button">
              {translate("popularChecklistPage.title")}
            </Link>
          </li>
        </ul>
        <ul className="footer__items">
          <li className="footer__item">
            <Link to="/our-mission" type="button">
              {translate("ourMissionPage.title")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/terms-of-use" type="button">
              {translate("termOfUsePage.title")}
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/contacts" type="button">
              {translate("contactsPage.title")}
            </Link>
          </li>
        </ul>
        <Networks />
      </nav>
    </footer>
  );
};

export default Footer;
