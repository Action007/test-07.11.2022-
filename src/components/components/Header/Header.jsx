import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import SearchInput from "../SearchInput/SearchInput";
import useClickOutside from "../../../hooks/useClickOutside";
import "./Header.scss";

import Logo from "../../../assets/images/content/logo.svg";
import { ReactComponent as Plus } from "../../../assets/images/icon/plus.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as BurgerSvg } from "../../../assets/images/icon/burgerSvg.svg";

const Header = () => {
  const { ref, show, setShowHandler } = useClickOutside();
  const showSearchOnMobile = useMediaQuery("(max-width:1199px)");
  const showAddButtonOnMobile = useMediaQuery("(max-width:767px)");
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header className="header">
      <Navbar
        className={`header__navbar position-fixed ${scroll && "scroll"}`}
        expand="md"
      >
        <Container className={`header__container ${scroll && "scroll"}`} fluid>
          <Link className="header__logo" to="/home">
            <img
              src={Logo}
              width="161"
              height="36"
              className="d-inline-block align-top"
              alt="Logotype"
            />
          </Link>
          {showAddButtonOnMobile && (
            <button
              onClick={setShowHandler}
              ref={ref}
              className="header__burger position-relative border-0 p-0"
              type="button"
            >
              <BurgerSvg />
              <span className="header__span">22</span>
            </button>
          )}
          {showAddButtonOnMobile && (
            <button
              onClick={() => navigate("/creation-of-checklist")}
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
                    <span className="header__span">22</span>
                  </button>
                </>
              )}
              <HeaderDropdown />
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
    </header>
  );
};

export default Header;
