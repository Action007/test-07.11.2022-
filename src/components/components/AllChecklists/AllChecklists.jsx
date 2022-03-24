import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import Tabs from "../Tabs/Tabs";

const AllChecklists = () => {
  const [value, setValue] = useState(1);
  const [category, setCategory] = useState("created");
  const url = `/api/v1/checklists_auth?search_type=${category}&page=${value}&per_page=10`;
  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(url);
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("allChecklistsPage.title") }];
  const tabs = [
    { id: 0, key: "created", title: translate("allChecklistsPage.created") },
    { id: 1, key: "liked", title: translate("allChecklistsPage.liked") },
    { id: 2, key: "saved", title: translate("allChecklistsPage.saved") },
  ];

  useEffect(() => setValue(1), [category]);

  const changeChecklistsHandler = (key) => {
    setCategory(key);
  };

  const loader = (
    <>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </>
  );

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
        {isLoading && loader}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {checklists &&
          checklists.entities.map((checklist) => (
            <Checklist
              key={checklist.id}
              checklist={checklist}
              translate={translate("allChecklistsPage.showMore")}
              created={category === "created"}
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

export default AllChecklists;
