import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import uniqueID from "../../../utils/uniqueID";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import Tabs from "../Tabs/Tabs";
import HomeButton from "../../UI/Buttons/HomeButton/HomeButton";

const MyActiveChecklists = () => {
  const [category, setCategory] = useState("active");
  const { t: translate } = useTranslation();
  const { search } = useLocation();
  const [url, setUrl] = useState(
    search || `?completed=false&page=1&per_page=10`
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      setUrl(search);
    }
  }, [search]);

  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchActiveChecklistQuery(`/active_checklists${url}`);

  useEffect(() => {
    if (pathname === "/active-checklists") {
      setUrl(`?completed=false&page=1&per_page=10`);
      setCategory("active");
    }
    if (pathname === "/passed-checklists") {
      setUrl(`?completed=true&page=1&per_page=10`);
      setCategory("passed");
    }
  }, [pathname]);

  useEffect(() => {
    if (error) navigate("/error");
  }, [error]);

  const breadcrumbs = [{ title: translate("myActiveChecklists.title") }];
  const tabs = [
    { id: 0, key: "active", title: translate("myActiveChecklists.active") },
    { id: 1, key: "passed", title: translate("myActiveChecklists.passed") },
  ];

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
        {checklists && checklists.entities.length ? (
          checklists.entities.map((checklist) => (
            <React.Fragment key={checklist.id}>
              <ProgressBarChecklist done={20} />
              <Checklist
                key={uniqueID()}
                checklist={checklist}
                translate={translate("myActiveChecklists.showMore")}
                page="my-active-checklists"
              />
            </React.Fragment>
          ))
        ) : (
          <div className="text-center mt-7">
            <div className="display-6 mb-6">
              {category === "active" &&
                translate("myActiveChecklists.activeEmpty")}
              {category === "passed" &&
                translate("myActiveChecklists.passedEmpty")}
            </div>
            {category === "active" && <HomeButton />}
            {category === "passed" && <HomeButton />}
          </div>
        )}
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
