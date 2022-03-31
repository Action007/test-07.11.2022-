import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
import "./Header.scss";

import Logo from "../../../assets/images/content/logo.svg";
import { ReactComponent as Plus } from "../../../assets/images/icon/plus.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as BurgerSvg } from "../../../assets/images/icon/burgerSvg.svg";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import SearchInput from "../SearchInput/SearchInput";

const Header = () => {
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
          <Navbar.Toggle
            className="header__burger position-relative border-0 p-0"
            aria-controls="navbarScroll"
          >
            <BurgerSvg />
            <span className="header__span">22</span>
          </Navbar.Toggle>
          {showAddButtonOnMobile && (
            <button
              onClick={() => navigate("/creation-of-checklist")}
              className="header__btn br-8"
              type="button"
            >
              <Plus />
            </button>
          )}
          <Navbar.Collapse className="order-4" id="navbarScroll">
            {!showSearchOnMobile && <SearchInput />}
            {!showAddButtonOnMobile && (
              <>
                <button
                  onClick={() => navigate("/my-active-checklists")}
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showSearchOnMobile && <SearchInput />}
    </header>
  );
};

export default Header;
