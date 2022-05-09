import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import ActiveChecklistDetail from "../ActiveChecklistDetail/ActiveChecklistDetail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";

const ActiveChecklist = () => {
  const { id } = useParams();
  const { data: checklist, isLoading } =
    checklistAPI.useFetchActiveChecklistQuery(`/active_checklists/${id}`);
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("checklists") }];

  return (
    <div className="container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="title--margin display-4 text-center SFPro-600">
        {translate("checklists")}
      </h2>
      <ProgressBarChecklist done={50} />
      {checklist && <ActiveChecklistDetail checklist={checklist.entities} />}
      {isLoading && <LoadingSkeleton />}
    </div>
  );
};

export default ActiveChecklist;
