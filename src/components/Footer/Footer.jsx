import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

import Logo from "../../assets/images/content/logo.svg";
import Networks from "../Networks/Networks";

const Footer = () => (
  <footer className="footer">
    <div className="footer__img">
      <img src={Logo} alt="Logotype" />
    </div>
    <nav className="footer__nav">
      <ul className="footer__items">
        <li className="footer__item">
          <Link to="/">Home</Link>
        </li>
        <li className="footer__item">
          <Link to="Support">Support</Link>
        </li>
        <li className="footer__item">
          <Link to="Popular-Checklist">Popular checklist</Link>
        </li>
        <li className="footer__item">
          <Link to="Privacy-Policy">Privacy policy</Link>
        </li>
      </ul>
      <ul className="footer__items">
        <li className="footer__item">
          <Link to="Our-Mission">Our mission</Link>
        </li>
        <li className="footer__item">
          <Link to="Terms-Of-Use">Terms of use</Link>
        </li>
        <li className="footer__item">
          <Link to="Contacts">Contacts</Link>
        </li>
      </ul>
      <Networks />
    </nav>
  </footer>
);

export default Footer;
