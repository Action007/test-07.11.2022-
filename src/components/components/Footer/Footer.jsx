import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";

import Logo from "../../../assets/images/icon/logo.svg";
import Networks from "../Networks/Networks";

const Footer = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  const onClickHandler = (address) => {
    navigate(address);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer__img">
        <img src={Logo} alt="Logotype" />
      </div>
      <nav className="footer__nav">
        <ul className="footer__items mb-0">
          <li className="footer__item">
            <button onClick={() => onClickHandler("/")} type="button">
              {translate("home")}
            </button>
          </li>
          <li className="footer__item">
            <button onClick={() => onClickHandler("/support")} type="button">
              {translate("supportPage.title")}
            </button>
          </li>
          <li className="footer__item">
            <button
              onClick={() => onClickHandler("/privacy-policy")}
              type="button"
            >
              {translate("privacyPolicyPage.title")}
            </button>
          </li>
          <li className="footer__item">
            <button
              onClick={() => navigate("/?per_page=5&page=1&popular=true")}
              type="button"
            >
              {translate("popularChecklistPage.title")}
            </button>
          </li>
        </ul>
        <ul className="footer__items">
          <li className="footer__item">
            <button
              onClick={() => onClickHandler("/our-mission")}
              type="button"
            >
              {translate("ourMissionPage.title")}
            </button>
          </li>
          <li className="footer__item">
            <button
              onClick={() => onClickHandler("/terms-of-use")}
              type="button"
            >
              {translate("termOfUsePage.title")}
            </button>
          </li>
          <li className="footer__item">
            <button onClick={() => onClickHandler("/contacts")} type="button">
              {translate("contactsPage.title")}
            </button>
          </li>
        </ul>
        <Networks />
      </nav>
    </footer>
  );
};

export default Footer;
