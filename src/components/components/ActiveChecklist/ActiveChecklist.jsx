import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ActiveChecklistDetail from "../ActiveChecklistDetail/ActiveChecklistDetail";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PopupDone from "../PopupDone/PopupDone";
import ProgressBarChecklist from "../ProgressBarChecklist/ProgressBarChecklist";

const ActiveChecklist = () => {
  const [checklist, setChecklist] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("checklists") }];

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "http://151.115.40.72:5000/api/v1/checklists_auth/7"
      );
      const responseData = await response.json();

      setChecklist(responseData);
    };
    getProducts();
  }, []);

  const doneChecklistsHandler = () => setModalShow(true);

  return (
    <div className="pb-7">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="mb-5 display-4 text-center SFPro-600">
        {translate("checklists")}
      </h2>
      <ProgressBarChecklist done={50} />
      <ActiveChecklistDetail
        checklist={checklist}
        checklistsHandler={doneChecklistsHandler}
      />
      <PopupDone show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ActiveChecklist;
