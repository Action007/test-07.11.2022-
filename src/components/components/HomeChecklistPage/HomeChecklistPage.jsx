import React, { useState } from "react";
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
import { checklistAPI } from "../../../services/checklistService";

const HomeChecklistPage = () => {
  const [value] = useState([1, 3]);
  const url = `/api/v1/checklists_auth?page=${value[0]}&per_page=${value[1]}`;
  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(url);
  const [modalShow, setModalShow] = useState(true);
  const { t: translate } = useTranslation();

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
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            {checklists &&
              checklists.entities.map((checklist) => (
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
          <div className="main-content__container">
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
      </div>
      <PopupLogin show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default HomeChecklistPage;
