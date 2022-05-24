import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
import Networks from "../Networks/Networks";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import SearchInput from "../SearchInput/SearchInput";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useClickOutside from "../../../hooks/useClickOutside";
import "./Header.scss";

import Logo from "../../../assets/images/content/logo.svg";
import { ReactComponent as Plus } from "../../../assets/images/icon/plus.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as BurgerSvg } from "../../../assets/images/icon/burgerSvg.svg";

const Header = () => {
  const { ref, show, setShowHandler, setShow } = useClickOutside();
  const showSearchOnMobile = useMediaQuery("(max-width:1199px)");
  const showAddButtonOnMobile = useMediaQuery("(max-width:767px)");
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef();
  const user = useSelector((state) => state.authSliceReducer.user);
  const token = useSelector((state) => state.authSliceReducer.token);
  const percent = useSelector((state) => state.authSliceReducer.percent);
  const { t: translate } = useTranslation();

  useEffect(() => {
    const scrollHandler = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const onClickHandler = (address) => {
    navigate(address);
    setShow(false);
  };

  const authorized = (
    <>
      {!showAddButtonOnMobile && (
        <>
          <button
            onClick={() => onClickHandler("/active-checklists")}
            className="header__progress"
            type="button"
          >
            <ProgressBarHeader done={percent || 0} />
          </button>
          <button
            onClick={() => onClickHandler("/saved-checklists")}
            className="header__bookmark"
            type="button"
          >
            <Bookmark />
            {user && user.saved_counter !== 0 && (
              <span className="header__span">{user.saved_counter}</span>
            )}
          </button>
        </>
      )}
      <HeaderDropdown setShow={setShow} />
      {!showAddButtonOnMobile && (
        <button
          onClick={() => navigate("/creation-of-checklist")}
          className="header__btn br-8"
          type="button"
        >
          <Plus />
          Create
        </button>
      )}
    </>
  );

  const notAuthorized = !showAddButtonOnMobile ? (
    <div className="header__buttons">
      <button
        onClick={() => navigate(`/sign-in`)}
        className="header__button SFPro-600"
        type="button"
      >
        {translate("loginButton")}
      </button>
      <button
        onClick={() => navigate(`/sign-up`)}
        className="header__button SFPro-600"
        type="button"
      >
        {translate("signUpButton")}
      </button>
    </div>
  ) : (
    <>
      <div className="header__items mb-0">
        <button
          onClick={() => onClickHandler("/")}
          className="header__item"
          type="button"
        >
          {translate("home")}
        </button>
        <button
          onClick={() => onClickHandler("/support")}
          className="header__item"
          type="button"
        >
          {translate("supportPage.title")}
        </button>
        <button
          onClick={() => onClickHandler("/?per_page=3&page=1&popular=true")}
          className="header__item"
          type="button"
        >
          {translate("popularChecklistPage.title")}
        </button>
        <button
          onClick={() => onClickHandler("/contacts")}
          className="header__item"
          type="button"
        >
          {translate("contactsPage.title")}
        </button>
        <button
          onClick={() => onClickHandler("/our-mission")}
          className="header__item"
          type="button"
        >
          {translate("ourMissionPage.title")}
        </button>
        <button
          onClick={() => onClickHandler("/terms-of-use")}
          className="header__item"
          type="button"
        >
          {translate("termOfUsePage.title")}
        </button>
        <button
          onClick={() => onClickHandler("/privacy-policy")}
          className="header__item"
          type="button"
        >
          {translate("privacyPolicyPage.title")}
        </button>
      </div>
      <Networks />
    </>
  );

  return (
    <header className="header" ref={headerRef}>
      <Navbar
        className={`header__navbar${scroll ? " scroll" : ""}${
          show ? " active" : ""
        }${!token ? " login" : ""}`}
        expand="md"
      >
        <Container
          ref={ref}
          className={`header__container${scroll ? " scroll" : ""}`}
          fluid
        >
          <div className={`header__inner${!token ? " login" : ""}`}>
            <button
              onClick={() => {
                onClickHandler("/");
                window.scrollTo(0, 0);
              }}
              className="header__logo"
              type="button"
            >
              <img
                src={Logo}
                width="161"
                height="36"
                className="d-inline-block align-top"
                alt="Logotype"
              />
            </button>
            {showAddButtonOnMobile && (
              <>
                <button
                  onClick={setShowHandler}
                  className="header__burger position-relative border-0 p-0"
                  type="button"
                >
                  <BurgerSvg />
                  {user && user.saved_counter !== 0 && (
                    <span className="header__span">{user.saved_counter}</span>
                  )}
                </button>
                {token ? (
                  <button
                    onClick={() => onClickHandler("/creation-of-checklist")}
                    className="header__btn br-8"
                    type="button"
                  >
                    <Plus />
                  </button>
                ) : (
                  <button
                    onClick={() => onClickHandler(`/sign-in`)}
                    className="header__login SFPro-500"
                    type="button"
                  >
                    {translate("signInButton")}
                  </button>
                )}
              </>
            )}
          </div>
          <CSSTransition
            classNames="headerMenu"
            in={!showAddButtonOnMobile ? true : show}
            timeout={300}
            unmountOnExit
          >
            <div className={`header__wrap SFPro-500${!token ? " login" : ""}`}>
              {!showSearchOnMobile && <SearchInput />}
              {token ? authorized : notAuthorized}
            </div>
          </CSSTransition>
        </Container>
      </Navbar>
      {showSearchOnMobile && <SearchInput />}
    </header>
  );
};

export default Header;
