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
  const API_KEY = process.env.REACT_APP_HOSTNAME;

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${API_KEY}/api/v1/checklists_auth/1`);
      const responseData = await response.json();
      setChecklist(responseData);
    };
    getProducts();
  }, []);

  return (
    <div className="pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="mb-5 display-4 text-center SFPro-600">
        {translate("checklists")}
      </h2>
      <ProgressBarChecklist done={50} />
      <ActiveChecklistDetail
        checklist={checklist}
        checklistsHandler={() => setModalShow(true)}
      />
      <PopupDone show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ActiveChecklist;
