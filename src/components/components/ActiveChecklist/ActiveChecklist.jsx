import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import ActiveChecklistDetail from "../ActiveChecklistDetail/ActiveChecklistDetail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PopupCreateDone from "../PopupCreateDone/PopupCreateDone";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";

const ActiveChecklist = () => {
  const { data: checklist, isLoading } =
    checklistAPI.useFetchChecklistQuery("/checklists/218");
  const [modalShow, setModalShow] = useState(true);
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("checklists") }];

  return (
    <div className="container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="title--margin display-4 text-center SFPro-600">
        {translate("checklists")}
      </h2>
      <ProgressBarChecklist done={50} />
      {checklist && <ActiveChecklistDetail checklist={checklist} />}
      {isLoading && <LoadingSkeleton />}
      <PopupCreateDone show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ActiveChecklist;
