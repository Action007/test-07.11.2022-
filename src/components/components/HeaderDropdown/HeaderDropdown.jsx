import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../../store/authSlice";
import { checklistAPI } from "../../../services/checklistService";
import useClickOutside from "../../../hooks/useClickOutside";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ProgressBarHeader from "../ProgressBarHeader/ProgressBarHeader";
import PopupLogout from "../PopupLogout/PopupLogout";
import Profile from "../../../assets/images/content/profile.png";
import "./HeaderDropdown.scss";

import { ReactComponent as Bookmark } from "../../../assets/images/icon/bookmark.svg";
import { ReactComponent as Account } from "../../../assets/images/icon/account.svg";
import { ReactComponent as Setting } from "../../../assets/images/icon/setting.svg";
import { ReactComponent as Logout } from "../../../assets/images/icon/logout.svg";

const HeaderDropdown = ({ setShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, show, setShowHandler } = useClickOutside();
  const showOnMobile = useMediaQuery("(max-width:767px)");
  const mobileClass = showOnMobile ? " mobile" : "";
  const [logout, setLogout] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const user = useSelector((state) => state.authSliceReducer.user);
  const percent = useSelector((state) => state.authSliceReducer.percent);
  const [logOut] = checklistAPI.useLogOutMutation();
  const { data: accountInfo, isError } = checklistAPI.useFetchAccountQuery();

  useEffect(() => {
    if (accountInfo) {
      const { completed_counter, active_checklists_counter } = accountInfo;

      dispatch(authSliceActions.setUser(accountInfo));
      dispatch(
        authSliceActions.setPercentActiveChecklist({
          completed_counter,
          active_checklists_counter,
        })
      );
    }
  }, [accountInfo]);

  useEffect(() => {
    if (!isError) return;
    dispatch(authSliceActions.resetUser());
    dispatch(authSliceActions.resetToken());
  }, [isError]);

  useEffect(() => {
    if (!isLogout) return;
    logOut();
    dispatch(authSliceActions.resetToken());
    dispatch(authSliceActions.resetUser());
    setShow(false);
    setShowHandler();
  }, [isLogout]);

  const onClickHandler = (address) => {
    navigate(address);
    setShow(false);
    setShowHandler();
  };

  return (
    <>
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
            <div className="header-dropdown__img">
              <img src={Profile} alt="account" />
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
              <span />
              All Checklists
            </button>
            <button
              onClick={() => onClickHandler("/my-profile")}
              className="header-dropdown__item"
              type="button"
            >
              <Account />
              Profile settings
            </button>
            <button
              onClick={() => onClickHandler("/account-settings")}
              className="header-dropdown__item"
              type="button"
            >
              <Setting />
              Account settings
            </button>
            <button
              onClick={() => setLogout(true)}
              className="header-dropdown__item"
              type="button"
            >
              <Logout />
              Log Out
            </button>
          </div>
        </CSSTransition>
      </div>
      <PopupLogout
        setIsLogout={setIsLogout}
        show={logout}
        onHide={() => setLogout(false)}
      />
      {/* <LoadingSpinnerPopup showSpinner={isLoading} /> */}
    </>
  );
};

export default HeaderDropdown;
