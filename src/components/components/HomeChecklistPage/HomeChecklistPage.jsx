import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MainBanner from "../MainBanner/MainBanner";
import PopupLogin from "../PopupLogin/PopupLogin";
import Sidebar from "../Sidebar/Sidebar";
import SearchInput from "../SearchInput/SearchInput";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../PaginationChecklist/PaginationChecklist";
import uniqueID from "../../../utils/uniqueId";
import "./HomeChecklistPage.scss";

import Logo from "../../../assets/images/content/logo.svg";
import { ReactComponent as Plus } from "../../../assets/images/icon/plus.svg";

const HomeChecklistPage = () => {
  const [checklists, setCheckLists] = useState([]);
  const [modalShow, setModalShow] = useState(true);
  const { t: translate } = useTranslation();
  const API_KEY = process.env.REACT_APP_HOSTNAME;

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `${API_KEY}/api/v1/checklists_auth?page=1&per_page=3`
      );
      const responseData = await response.json();

      setCheckLists(responseData.entities);
    };

    getProducts();
  }, []);

  return (
    <>
      <MainBanner />
      <div className="main-content">
        <div className="container main-content__wrapper">
          <Sidebar />
          <div className="main-content__wrap">
            <h3 className="main-content__title">
              {translate("mainPage.popularQuestion")}
            </h3>
            <SearchInput />
            {checklists.map((checklist) => (
              <Checklist
                key={uniqueID()}
                checklist={checklist}
                translate={translate("allChecklistsPage.showMore")}
              />
            ))}
            <PaginationChecklist />
          </div>
        </div>
        <div className="main-content__inner">
          <div className="main-content__img">
            <img src={Logo} alt="logotype" />
          </div>
          <h3 className="main-content__heading SFPro-600">
            {translate("mainPage.heading")}
          </h3>
          <p className="main-content__desc">{translate("mainPage.desc")}</p>
          <button className="main-content__button SFPro-600" type="button">
            <Plus />
            {translate("mainPage.button")}
          </button>
        </div>
      </div>
      <PopupLogin show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default HomeChecklistPage;
