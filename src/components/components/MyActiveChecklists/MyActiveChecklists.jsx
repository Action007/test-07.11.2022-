import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import uniqueID from "../../../utils/uniqueId";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import Tabs from "../Tabs/Tabs";

import Pagination from "../Pagination/Pagination";

const MyActiveChecklists = () => {
  const [value, setValue] = useState(1);
  const [, setCategory] = useState(true);
  const { t: translate } = useTranslation();
  const url = `http://151.115.40.72:5000/api/v1/checklists_auth?page=${value}&per_page=10`;
  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(url);

  const breadcrumbs = [{ title: translate("myActiveChecklists.title") }];
  const tabs = [
    { id: 0, key: "active", title: translate("myActiveChecklists.active") },
    { id: 1, key: "passed", title: translate("myActiveChecklists.passed") },
  ];

  const changeChecklistsHandler = (number) => {
    setCategory(number === 0);
  };

  return (
    <div className="container pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("myActiveChecklists.title")}
        </h2>
        <Tabs
          changeHandler={changeChecklistsHandler}
          tabs={tabs}
          category="active"
        />
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {checklists &&
          checklists.entities.map((checklist) => (
            <Checklist
              key={uniqueID()}
              checklist={checklist}
              translate={translate("myActiveChecklists.showMore")}
              active
            />
          ))}
      </div>
      {checklists && (
        <Pagination
          count={checklists.paginate.total_pages}
          setValue={setValue}
          currentPage={checklists.paginate.current_page}
          totalPage={checklists.paginate.total_pages}
          prevPage={checklists.paginate.prev_page}
          nextPage={checklists.paginate.next_page}
        />
      )}
    </div>
  );
};

export default MyActiveChecklists;
