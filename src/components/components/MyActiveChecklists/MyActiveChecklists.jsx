import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import uniqueID from "../../../utils/uniqueID";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import Tabs from "../Tabs/Tabs";

const MyActiveChecklists = () => {
  const [category, setCategory] = useState("active");
  const { t: translate } = useTranslation();
  const { search } = useLocation();
  const [url, setUrl] = useState(search || "?page=1&per_page=10");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (search) setUrl(search);
    if (!search) setUrl("?page=1&per_page=10");
  }, [search]);

  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(`/checklists_auth${url}`);

  const breadcrumbs = [{ title: translate("myActiveChecklists.title") }];
  const tabs = [
    { id: 0, key: "active", title: translate("myActiveChecklists.active") },
    { id: 1, key: "passed", title: translate("myActiveChecklists.passed") },
  ];

  useEffect(() => {
    if (pathname === "/active-checklists") {
      setCategory("active");
    }
    if (pathname === "/passed-checklists") {
      setCategory("passed");
    }
  }, [pathname]);

  useEffect(() => {
    if (error) navigate("/error");
  }, [error]);

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
    <div className="container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="title--margin display-4 text-center SFPro-600">
          {translate("myActiveChecklists.title")}
        </h2>
        <Tabs tabs={tabs} category={category} />
        {isLoading && loader}
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
      {checklists && checklists.paginate.total_pages > 1 && (
        <Pagination
          count={checklists.paginate.total_pages}
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
