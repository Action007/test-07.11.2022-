import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import CreateButton from "../../UI/Buttons/CreateButton/CreateButton";
import HomeButton from "../../UI/Buttons/HomeButton/HomeButton";
import ChecklistSkeleton from "../../UI/ChecklistSkeleton/ChecklistSkeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import Pagination from "../Pagination/Pagination";
import Tabs from "../Tabs/Tabs";

const AllChecklists = () => {
  const [category, setCategory] = useState("created");
  const { search } = useLocation();

  const {
    data: checklists,
    error,
    isFetching,
  } = checklistAPI.useFetchChecklistQuery(
    `/checklists_auth${search || `?search_type=${category}&page=1&per_page=10`}`
  );
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const breadcrumbs = [{ title: translate("allChecklistsPage.title") }];
  const tabs = [
    { id: 0, key: "created", title: translate("allChecklistsPage.created") },
    { id: 1, key: "liked", title: translate("allChecklistsPage.liked") },
    { id: 2, key: "saved", title: translate("allChecklistsPage.saved") },
  ];

  useEffect(() => {
    if (!search) {
      navigate(`?search_type=created&page=1&per_page=10`);
    }
  }, [search]);

  useEffect(() => {
    if (pathname === "/saved-checklists") {
      setCategory("saved");
    }
    if (pathname === "/liked-checklists") {
      setCategory("liked");
    }
    if (pathname === "/created-checklists") {
      setCategory("created");
    }
  }, [pathname]);

  useEffect(() => {
    if (error) navigate("/error");
  }, [error]);

  const loader = (
    <>
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
      <ChecklistSkeleton />
    </>
  );

  return (
    <div className="container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="title--margin display-4 text-center SFPro-600">
          {translate("allChecklistsPage.title")}
        </h2>
        <Tabs
          tabs={tabs}
          category={category}
          setCategory={setCategory}
          page="all-checklists"
        />
        {isFetching && loader}
        {!isFetching &&
          (checklists && checklists.entities.length ? (
            checklists.entities.map((checklist) => (
              <Checklist
                key={checklist.id}
                checklist={checklist}
                created={category === "created"}
              />
            ))
          ) : (
            <div className="text-center mt-7">
              <div className="display-6 mb-6">
                {category === "saved" &&
                  translate("allChecklistsPage.savedEmpty")}
                {category === "liked" &&
                  translate("allChecklistsPage.likedEmpty")}
                {category === "created" &&
                  translate("allChecklistsPage.createdEmpty")}
              </div>
              {category === "saved" && <HomeButton />}
              {category === "liked" && <HomeButton />}
              {category === "created" && <CreateButton />}
            </div>
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

export default AllChecklists;
