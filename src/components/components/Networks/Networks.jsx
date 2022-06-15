import React from "react";
import "./Networks.scss";
import { ReactComponent as Facebook } from "../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/images/icon/instagram.svg";

const Networks = () => (
  <div className="networks">
    <a href="https://proxyone.eu/" target="_blank" rel="noreferrer">
      <Facebook />
    </a>
    <a
      href="https://twitter.com/proxyonecompany"
      target="_blank"
      rel="noreferrer"
    >
      <Twitter />
    </a>
    <a
      href="https://www.instagram.com/proxyone.company/"
      target="_blank"
      rel="noreferrer"
    >
      <Instagram />
    </a>
  </div>
);

export default Networks;
