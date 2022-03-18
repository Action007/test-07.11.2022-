import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../PaginationChecklist/PaginationChecklist";
import Tabs from "../Tabs/Tabs";

const AllChecklists = () => {
  const [limit] = useState([1, 100]);
  const { data, error, isLoading } =
    checklistAPI.useFetchAllChecklistsQuery(limit);
  const [checklists, setChecklists] = useState(data?.entities);
  const [category, setCategory] = useState("created");
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("allChecklistsPage.title") }];
  const tabs = [
    { id: 0, key: "created", title: translate("allChecklistsPage.created") },
    { id: 1, key: "liked", title: translate("allChecklistsPage.liked") },
    { id: 2, key: "saved", title: translate("allChecklistsPage.saved") },
  ];

  useEffect(() => {
    if (category === "saved") {
      setChecklists(
        data.entities.filter((checklist) => checklist.user_track?.saved)
      );
    } else if (category === "created") {
      setChecklists(data?.entities);
    }
  }, [category]);

  const changeChecklistsHandler = (key) => {
    setCategory(key);
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
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {checklists &&
          checklists.map((checklist) => (
            <Checklist
              key={checklist.id}
              checklist={checklist}
              translate={translate("allChecklistsPage.showMore")}
              created={category}
            />
          ))}
      </div>
      <PaginationChecklist paginate={data?.paginate} />
    </div>
  );
};

export default AllChecklists;
