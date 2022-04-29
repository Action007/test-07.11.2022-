import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { heightForScrollActions } from "../../../store/heightForScrollSlice";
// import PopupLogout from "../PopupLogout/PopupLogout";
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
  const dispatch = useDispatch();
  // const [modalShow, setModalShow] = useState(true);
  const { ref, show, setShowHandler, setShow } = useClickOutside();
  const showSearchOnMobile = useMediaQuery("(max-width:1199px)");
  const showAddButtonOnMobile = useMediaQuery("(max-width:767px)");
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef();

  useEffect(() => {
    const scrollHandler = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(heightForScrollActions.setHeight(headerRef.current.clientHeight));
  }, []);

  const onClickHandler = (address) => {
    navigate(address);
    setShow(false);
  };

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
            onClick={() => onClickHandler("/")}
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
              <span className="header__span">17</span>
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
              {!showAddButtonOnMobile && (
                <>
                  <button
                    onClick={() => navigate("/active-checklists")}
                    className="header__progress"
                    type="button"
                  >
                    <ProgressBarHeader done={29} />
                  </button>
                  <button
                    onClick={() => navigate("/saved-checklists")}
                    className="header__bookmark"
                    type="button"
                  >
                    <Bookmark />
                    <span className="header__span">17</span>
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
            </div>
          </CSSTransition>
        </Container>
      </Navbar>
      {showSearchOnMobile && <SearchInput />}
      {/* <PopupLogout show={modalShow} onHide={() => setModalShow(false)} /> */}
    </header>
  );
};

export default Header;
