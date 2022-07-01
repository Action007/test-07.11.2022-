import React from "react";
import { useTranslation } from "react-i18next";
import getPercent from "../../../utils/getPercent";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import ActiveChecklistDetail from "../ActiveChecklistDetail/ActiveChecklistDetail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";

const ActiveChecklist = ({ checklist, isLoading }) => {
  const { t: translate } = useTranslation();
  const breadcrumbs = [
    { title: translate("myActiveChecklists.title"), link: -1 },
    { title: checklist && checklist.entities.checklist.name },
  ];

  return (
    <div className="container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="title--margin display-4 text-center SFPro-600">
        {translate("checklists")}
      </h2>
      {checklist && (
        <ProgressBarChecklist
          done={getPercent(
            checklist.entities.completed_items_counter,
            checklist.entities.total_items_counter
          )}
        />
      )}
      {checklist && <ActiveChecklistDetail checklist={checklist.entities} />}
      {isLoading && <LoadingSkeleton />}
    </div>
  );
};

export default ActiveChecklist;
