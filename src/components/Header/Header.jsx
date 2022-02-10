import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Navbar, ProgressBar } from "react-bootstrap";
import "./Header.scss";

import Logo from "../../assets/images/content/logo.svg";
import Profile from "../../assets/images/content/profile.png";
import { ReactComponent as Plus } from "../../assets/images/icon/plus.svg";
import { ReactComponent as Bookmark } from "../../assets/images/icon/bookmark.svg";
import { ReactComponent as Account } from "../../assets/images/icon/account.svg";
import { ReactComponent as Setting } from "../../assets/images/icon/setting.svg";
import { ReactComponent as Logout } from "../../assets/images/icon/logout.svg";

const Header = () => (
  <header className="header">
    <Navbar
      className="p-0 d-flex justify-content-between align-items-center"
      expand="lg"
    >
      <Navbar.Brand>
        <Link to="/">
          <img
            src={Logo}
            width="161"
            height="36"
            className="d-inline-block align-top"
            alt="Logotype"
          />
        </Link>
      </Navbar.Brand>
      <div className="d-flex align-items-center justify-content-end w-100">
        <form className="header__form">
          <label className="header__label" htmlFor="search-input">
            <input
              className="header__input border-0"
              placeholder="How to set up a company in the USA"
              type="email"
            />
          </label>
        </form>
        <ProgressBar
          className="header__progress h-25"
          now={60}
          label="Active checklist"
        />
        <Button className="header__bookmark">
          <Bookmark />
          <span className="header__span">22</span>
        </Button>
        <Dropdown className="header__dropdown">
          <Dropdown.Toggle
            className="header__dropdown-button d-flex align-items-center bg-white border-0 text-dark br-8"
            variant="success"
            id="dropdown-basic"
          >
            <div className="header__img">
              <img src={Profile} alt="account" />
            </div>
            Alex64
          </Dropdown.Toggle>
          <Dropdown.Menu className="header__items p-0 mt-3 border-0 r-0">
            <Dropdown.Item className="header__item" href="#/action-1">
              <span className="header__percent">60%</span>
              <ProgressBar
                className="header__progress"
                now={60}
                label="Active checklist"
              />
            </Dropdown.Item>
            <Dropdown.Item className="header__item" href="#/action-2">
              <Bookmark />
              My Checklists
            </Dropdown.Item>
            <Dropdown.Item className="header__item" href="#/action-3">
              <Account />
              Profile settings
            </Dropdown.Item>
            <Dropdown.Item className="header__item" href="#/action-4">
              <Setting />
              Account settings
            </Dropdown.Item>
            <Dropdown.Item className="header__item" href="#/action-5">
              <Logout />
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          className="header__btn text-light d-flex align-items-center br-8"
          variant="primary"
        >
          <Plus />
          Create
        </Button>
      </div>
    </Navbar>
  </header>
);

export default Header;
