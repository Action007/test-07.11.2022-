import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import uniqueID from "../../../utils/uniqueId";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../Pagination/Pagination";
import Tabs from "../Tabs/Tabs";

const AllChecklists = () => {
  const [checklists, setCheckLists] = useState([]);
  const [category, setCategory] = useState(true);
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("allChecklistsPage.title") }];
  const tabs = [
    { id: 0, name: translate("allChecklistsPage.created") },
    { id: 1, name: translate("allChecklistsPage.liked") },
    { id: 2, name: translate("allChecklistsPage.saved") },
  ];

  const changeChecklistsHandler = (number) => {
    setCategory(number === 0);
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "http://151.115.40.72:5000/api/v1/checklists_auth?page=1&per_page=10"
      );
      const responseData = await response.json();

      setCheckLists(responseData.entities);
    };

    getProducts();
  }, []);

  return (
    <div className="pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("allChecklistsPage.title")}
        </h2>
        <Tabs changeHandler={changeChecklistsHandler} tabs={tabs} />
        {checklists.map((checklist) => (
          <Checklist
            key={uniqueID()}
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
