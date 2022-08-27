import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { authSliceActions } from "../../../store/authSlice";
import { useLogOutMutation } from "../../../services/logInService";
import useClickOutside from "../../../hooks/useClickOutside";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
import PopupLogout from "../PopupLogout/PopupLogout";
import "./HeaderDropdown.scss";

import brokenImg from "../../../assets/images/icon/brokenImg.svg";
import EmptySvg from "../../../assets/images/icon/emptyPhoto.svg";
import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as Account } from "../../../assets/images/icon/account.svg";
import { ReactComponent as Setting } from "../../../assets/images/icon/setting.svg";
import { ReactComponent as Logout } from "../../../assets/images/icon/logout.svg";

const HeaderDropdown = ({ user, savedCounter, setShow, percent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, show, setShowHandler } = useClickOutside();
  const [isLogOut, setIsLogout] = useState(false);
  const showOnMobile = useMediaQuery("(max-width:767px)");
  const mobileClass = showOnMobile ? " mobile" : "";

  const [logOut] = useLogOutMutation();

  const { t: translate } = useTranslation();

  const onLogOutHandler = () => {
    logOut();
    dispatch(authSliceActions.resetToken());
    dispatch(authSliceActions.resetUser());
    setShow(false);
    setShowHandler();
  };

  const onClickHandler = (address) => {
    navigate(address);
    setShow(false);
    setShowHandler();
  };

  const onErrorImgHandler = (e) => {
    e.target.src = brokenImg;
    e.target.alt = "broken image";
  };

  return (
    <>
      <PopupLogout
        logout={onLogOutHandler}
        show={isLogOut}
        onHide={() => setIsLogout(false)}
      />
      <div className={`header-dropdown SFPro-500${mobileClass}`} ref={ref}>
        {!showOnMobile && (
          <button
            onClick={setShowHandler}
            className={`header-dropdown__button${
              show ? " show" : ""
            }${mobileClass}`}
            variant="success"
            type="button"
          >
            <div
              className={`header-dropdown__img${
                user.avatar_url ? " fill" : " empty"
              }`}
            >
              {user?.avatar_url ? (
                <img
                  onError={onErrorImgHandler}
                  src={user.avatar_url}
                  alt="account"
                />
              ) : (
                <img src={EmptySvg} alt="account" />
              )}
            </div>
            <span className="header-dropdown__name">
              {user ? user.nickname : ""}
            </span>
          </button>
        )}
        <CSSTransition
          classNames="headerDropdown"
          in={showOnMobile ? true : show}
          timeout={300}
          unmountOnExit
        >
          <div className={`header-dropdown__menu${mobileClass}`}>
            <button
              onClick={() =>
                onClickHandler(
                  "/active-checklists?completed=false&page=1&per_page=10"
                )
              }
              className="header-dropdown__inner"
              type="button"
            >
              <span className="header-dropdown__percent SFPro-700">
                {percent || 0}%
              </span>
              <div className="header-dropdown__progress">
                <ProgressBarHeader done={percent || 0} />
              </div>
            </button>
            <button
              onClick={() =>
                onClickHandler(
                  "/created-checklists?search_type=created&page=1&per_page=10"
                )
              }
              className="header-dropdown__item header-dropdown__item--first"
              type="button"
            >
              <Bookmark />
              {!!savedCounter && <span />}
              {translate("header.allChecklists")}
            </button>
            <button
              onClick={() => onClickHandler(user ? `/${user.nickname}` : "")}
              className="header-dropdown__item"
              type="button"
            >
              <Account />
              {translate("header.profileSettings")}
            </button>
            <button
              onClick={() => onClickHandler("/account-settings")}
              className="header-dropdown__item"
              type="button"
            >
              <Setting />
              {translate("header.accountSettings")}
            </button>
            <button
              onClick={() => setIsLogout(true)}
              className="header-dropdown__item"
              type="button"
            >
              <Logout />
              {translate("header.signOut")}
            </button>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default HeaderDropdown;
