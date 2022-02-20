import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import useDropdown from "../../../hooks/useDropdown";
import useMediaQuery from "../../../hooks/useMediaQuery";
import "./HeaderDropdown.scss";

import Profile from "../../../assets/images/content/profile.png";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as Account } from "../../../assets/images/icon/account.svg";
import { ReactComponent as Setting } from "../../../assets/images/icon/setting.svg";
import { ReactComponent as Logout } from "../../../assets/images/icon/logout.svg";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";

const HeaderDropdown = () => {
  const { ref, show, setShowHandler } = useDropdown();
  const showOnMobile = useMediaQuery("(max-width:767px)");
  const mobileClass = showOnMobile ? " mobile" : "";

  return (
    <div className={`header-dropdown SFPro-500${mobileClass}`} ref={ref}>
      <button
        onClick={setShowHandler}
        className={`${`header-dropdown__button`}${
          show ? " show" : ""
        }${mobileClass}`}
        variant="success"
        type="button"
      >
        <div className="header-dropdown__img">
          <img src={Profile} alt="account" />
        </div>
        <span className="header-dropdown__name">Alex64</span>
      </button>
      <CSSTransition
        classNames="headerDropdown"
        in={showOnMobile ? true : show}
        timeout={300}
        unmountOnExit
      >
        <div className={`header-dropdown__menu${mobileClass}`}>
          <Link
            onClick={setShowHandler}
            className="header-dropdown__inner"
            to="/Active-Checklists"
          >
            <span className="header-dropdown__percent">60%</span>
            <div className="header-dropdown__progress">
              <ProgressBarHeader done={29} />
            </div>
          </Link>
          <Link
            onClick={setShowHandler}
            className="header-dropdown__item header-dropdown__item--first"
            to="/All-Checklists"
          >
            <Bookmark />
            <span />
            All Checklists
          </Link>
          <button className="header-dropdown__item" type="button">
            <Account />
            Profile settings
          </button>
          <button className="header-dropdown__item" type="button">
            <Setting />
            Account settings
          </button>
          <button className="header-dropdown__item" type="button">
            <Logout />
            Log Out
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default HeaderDropdown;
