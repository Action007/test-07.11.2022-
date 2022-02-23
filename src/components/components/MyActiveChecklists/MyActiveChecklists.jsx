import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import uniqueID from "../../../utils/uniqueId";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../Pagination/Pagination";
import Tabs from "../Tabs/Tabs";

const MyActiveChecklists = () => {
  const [checklists, setCheckLists] = useState([]);
  const [, setCategory] = useState(true);
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("myActiveChecklists.title") }];
  const tabs = [
    { id: 0, name: translate("myActiveChecklists.active") },
    { id: 1, name: translate("myActiveChecklists.passed") },
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
      console.log(responseData.entities);
    };

    getProducts();
  }, []);

  return (
    <div className="pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("myActiveChecklists.title")}
        </h2>
        <Tabs changeHandler={changeChecklistsHandler} tabs={tabs} />
        {checklists.map((checklist) => (
          <Checklist
            key={uniqueID()}
            checklist={checklist}
            translate={translate("myActiveChecklists.showMore")}
            active
          />
        ))}
      </div>
      <PaginationChecklist />
    </div>
  );
};

export default MyActiveChecklists;
