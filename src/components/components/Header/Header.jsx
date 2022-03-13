import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Navbar } from "react-bootstrap";
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
  const scrollClass = `header__navbar position-fixed ${scroll && "scroll"}`;

  useEffect(() => {
    const scrollHandler = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header className="header">
      <Navbar className={scrollClass} expand="md">
        <Container className="p-0" fluid>
          <Navbar.Brand className="header__logo">
            <Link to="/home">
              <img
                src={Logo}
                width="161"
                height="36"
                className="d-inline-block align-top"
                alt="Logotype"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            className="header__burger position-relative border-0 p-0"
            aria-controls="navbarScroll"
          >
            <BurgerSvg />
            <span className="header__span">22</span>
          </Navbar.Toggle>
          {showAddButtonOnMobile && (
            <Link className="header__btn-link" to="/creation-of-checklist">
              <button className="header__btn br-8" type="button">
                <Plus />
              </button>
            </Link>
          )}
          <Navbar.Collapse className="order-4" id="navbarScroll">
            {!showSearchOnMobile && <SearchInput />}
            {!showAddButtonOnMobile && (
              <>
                <Link className="header__progress" to="/my-active-checklists">
                  <ProgressBarHeader done={29} />
                </Link>
                <Link to="/saved-checklists">
                  <Button className="header__bookmark">
                    <Bookmark />
                    <span className="header__span">22</span>
                  </Button>
                </Link>
              </>
            )}
            <HeaderDropdown />
            {!showAddButtonOnMobile && (
              <Link to="/creation-of-checklist">
                <button className="header__btn br-8" type="button">
                  <Plus />
                  Create
                </button>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showSearchOnMobile && <SearchInput />}
    </header>
  );
};

export default Header;
