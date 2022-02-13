import React from "react";
import "./Networks.scss";
import { ReactComponent as Facebook } from "../../../assets/images/icon/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/images/icon/twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/images/icon/instagram.svg";

const Networks = () => (
  <div className="networks">
    <a href="/#">
      <Facebook />
    </a>
    <a href="/#">
      <Twitter />
    </a>
    <a href="/#">
      <Instagram />
    </a>
  </div>
);

export default Networks;
