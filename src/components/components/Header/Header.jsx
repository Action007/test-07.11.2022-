import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFetchAccountInfoQuery } from "../../../services/accountService";
import { authSliceActions } from "../../../store/authSlice";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
import Networks from "../Networks/Networks";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import SearchInput from "../SearchInput/SearchInput";
import useMediaQuery from "../../../hooks/useMediaQuery";
import isServerError from "../../../utils/isServerError";
import useClickOutside from "../../../hooks/useClickOutside";
import "./Header.scss";

import Logo from "../../../assets/images/icon/logo.svg";
import { ReactComponent as Plus } from "../../../assets/images/icon/plus.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as BurgerSvg } from "../../../assets/images/icon/burgerSvg.svg";

const Header = () => {
  const user = useSelector((state) => state.authSliceReducer.user);
  const percent = useSelector((state) => state.authSliceReducer.percent);
  const token = useSelector((state) => state.authSliceReducer.token);

  const headerRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [savedCounter, setSavedCounter] = useState(user?.saved_counter);

  const { ref, show, setShowHandler, setShow } = useClickOutside();
  const showSearchOnMobile = useMediaQuery("(max-width:1199px)");
  const showAddButtonOnMobile = useMediaQuery("(max-width:767px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t: translate } = useTranslation();

  const { data: accountInfo, error } = useFetchAccountInfoQuery("", {
    skip: !token,
  });

  useEffect(() => {
    if (!accountInfo) return;
    const { completed_counter, active_checklists_counter } = accountInfo;
    dispatch(authSliceActions.setUser(accountInfo));
    dispatch(
      authSliceActions.setPercentActiveChecklist({
        completed_counter,
        active_checklists_counter,
      })
    );
  }, [accountInfo]);

  useEffect(() => {
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
    }
  }, [error]);

  useEffect(() => {
    if (pathname === "/saved-checklists" || !user) return;
    setSavedCounter(user.saved_counter);
  }, [user]);

  useEffect(() => {
    if (pathname !== "/saved-checklists") return;
    setSavedCounter(false);
  }, [pathname]);

  useEffect(() => {
    const scrollHandler = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const onChangePageHandler = (address) => {
    navigate(address);
    setShow(false);
  };

  const onClickCreateHandler = () => {
    window.scrollTo(0, 0);
    navigate("/creation-of-checklist");
  };

  const authorized = (
    <>
      {!showAddButtonOnMobile && (
        <>
          <button
            onClick={() =>
              onChangePageHandler(
                "/active-checklists?completed=false&page=1&per_page=10"
              )
            }
            className="header__progress"
            type="button"
          >
            <ProgressBarHeader done={percent || 0} />
          </button>
          <button
            onClick={() =>
              onChangePageHandler(
                "/saved-checklists?search_type=saved&page=1&per_page=10"
              )
            }
            className="header__bookmark"
            type="button"
          >
            <Bookmark />
            {!!savedCounter && (
              <span className="header__span">{savedCounter}</span>
            )}
          </button>
        </>
      )}
      <HeaderDropdown
        user={user}
        savedCounter={savedCounter}
        setShow={setShow}
      />
      {!showAddButtonOnMobile && (
        <button
          onClick={onClickCreateHandler}
          className="header__btn br-8"
          type="button"
        >
          <Plus />
          {translate("header.create")}
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
        {translate("signInButton")}
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
          onClick={() => onChangePageHandler("/")}
          className="header__item"
          type="button"
        >
          {translate("home")}
        </button>
        <button
          onClick={() => onChangePageHandler("/support")}
          className="header__item"
          type="button"
        >
          {translate("supportPage.title")}
        </button>
        <button
          onClick={() =>
            onChangePageHandler("/?per_page=5&page=1&popular=true")
          }
          className="header__item"
          type="button"
        >
          {translate("popularChecklistPage.title")}
        </button>
        <button
          onClick={() => onChangePageHandler("/contacts")}
          className="header__item"
          type="button"
        >
          {translate("contactsPage.title")}
        </button>
        <button
          onClick={() => onChangePageHandler("/our-mission")}
          className="header__item"
          type="button"
        >
          {translate("ourMissionPage.title")}
        </button>
        <button
          onClick={() => onChangePageHandler("/terms-of-use")}
          className="header__item"
          type="button"
        >
          {translate("termOfUsePage.title")}
        </button>
        <button
          onClick={() => onChangePageHandler("/privacy-policy")}
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
        }${!user ? " login" : ""}`}
        expand="md"
      >
        <Container
          ref={ref}
          className={`header__container${scroll ? " scroll" : ""}`}
          fluid
        >
          <div className={`header__inner${!user ? " login" : ""}`}>
            <button
              onClick={() => {
                onChangePageHandler("/");
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
                </button>
                {user ? (
                  <button
                    onClick={onClickCreateHandler}
                    className="header__btn br-8"
                    type="button"
                  >
                    <Plus />
                  </button>
                ) : (
                  <button
                    onClick={() => onChangePageHandler(`/sign-in`)}
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
            <div className={`header__wrap SFPro-500${!user ? " login" : ""}`}>
              {!showSearchOnMobile && <SearchInput header />}
              {user ? authorized : notAuthorized}
            </div>
          </CSSTransition>
        </Container>
      </Navbar>
      {user
        ? showSearchOnMobile && pathname !== "/" && <SearchInput />
        : showSearchOnMobile && <SearchInput header />}
    </header>
  );
};

export default Header;
