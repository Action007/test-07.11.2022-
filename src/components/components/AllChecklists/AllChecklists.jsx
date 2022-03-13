import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../PaginationChecklist/PaginationChecklist";
import Tabs from "../Tabs/Tabs";

const AllChecklists = () => {
  const [checklists, setCheckLists] = useState([]);
  const [category, setCategory] = useState("created");
  const { pathname } = useLocation();
  const { t: translate } = useTranslation();
  const API_KEY = process.env.REACT_APP_HOSTNAME;

  const breadcrumbs = [{ title: translate("allChecklistsPage.title") }];
  const tabs = [
    { id: 0, key: "created", title: translate("allChecklistsPage.created") },
    { id: 1, key: "liked", title: translate("allChecklistsPage.liked") },
    { id: 2, key: "saved", title: translate("allChecklistsPage.saved") },
  ];

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `${API_KEY}/api/v1/checklists_auth?page=1&per_page=10`
      );
      const responseData = await response.json();

      setCheckLists(responseData.entities);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (pathname === "/saved-checklists") setCategory(false);
    if (pathname === "/all-checklists") setCategory(true);
  }, [pathname]);

  const changeChecklistsHandler = (key) => {
    setCategory(key === "created");
  };

  return (
    <div className="container pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("allChecklistsPage.title")}
        </h2>
        <Tabs
          changeHandler={changeChecklistsHandler}
          tabs={tabs}
          category={category}
        />
        {checklists.map((checklist) => (
          <Checklist
            key={checklist.id}
            checklist={checklist}
            translate={translate("allChecklistsPage.showMore")}
            created={category}
          />
        ))}
      </div>
      <PaginationChecklist />
    </div>
  );
};

export default AllChecklists;
