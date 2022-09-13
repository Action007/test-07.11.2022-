import React from "react";
import { useTranslation } from "react-i18next";
import ChecklistSkeleton from "../../UI/ChecklistSkeleton/ChecklistSkeleton";
import ActiveChecklistDetail from "../ActiveChecklistDetail/ActiveChecklistDetail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const ActiveChecklist = ({ checklist, isFetching }) => {
  const { t: translate } = useTranslation();
  const breadcrumbs = [
    {
      title: translate("myActiveChecklists.title"),
      link: "/active-checklists?completed=false&page=1&per_page=10",
    },
    { title: checklist ? checklist.entities.name : "" },
  ];

  return (
    <div className="container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="title--margin display-4 text-center SFPro-600">
        {translate("checklists")}
      </h2>
      {checklist && !isFetching && (
        <ActiveChecklistDetail checklist={checklist.entities} />
      )}
      {isFetching && <ChecklistSkeleton page="active-checklists" />}
    </div>
  );
};

export default ActiveChecklist;
