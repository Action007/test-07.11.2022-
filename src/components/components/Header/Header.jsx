import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
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
  // const [modalShow, setModalShow] = useState(true);
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

  const onLogin = (
    <>
      {!showAddButtonOnMobile && (
        <>
          <button
            onClick={() => navigate("/active-checklists")}
            className="header__progress"
            type="button"
          >
            <ProgressBarHeader done={percent || 0} />
          </button>
          <button
            onClick={() => navigate("/saved-checklists")}
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

  return (
    <header className="header" ref={headerRef}>
      <Navbar
        className={`header__navbar position-fixed ${scroll && "scroll"}`}
        expand="md"
      >
        <Container
          ref={ref}
          className={`header__container ${scroll && "scroll"}`}
          fluid
        >
          <button
            onClick={() => {
              navigate("/");
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
          )}
          {showAddButtonOnMobile && (
            <button
              onClick={() => onClickHandler("/creation-of-checklist")}
              className="header__btn br-8"
              type="button"
            >
              <Plus />
            </button>
          )}
          <CSSTransition
            classNames="headerMenu"
            in={!showAddButtonOnMobile ? true : show}
            timeout={300}
            unmountOnExit
          >
            <div className="header__wrap">
              {!showSearchOnMobile && <SearchInput />}
              {token ? (
                onLogin
              ) : (
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
              )}
            </div>
          </CSSTransition>
        </Container>
      </Navbar>
      {showSearchOnMobile && <SearchInput />}
    </header>
  );
};

export default Header;
