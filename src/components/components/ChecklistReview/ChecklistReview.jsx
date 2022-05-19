import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ChecklistComments from "../ChecklistComments/ChecklistComments";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";

const ChecklistReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.authSliceReducer.token);
  const [pageCount, setPageCount] = useState(1);
  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(
    `/${
      token ? "checklists_auth" : "checklists"
    }/${id}?page=${pageCount}&per_page=3`
  );
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("checklistReviewPage.title") }];

  useEffect(() => {
    if (error) navigate("/error");
  }, [error]);

  return (
    <div className="checklist-detail container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading && <LoadingSkeleton />}
      {checklists && (
        <ChecklistDetail checklists={checklists.checklist} detailPage />
      )}
      {checklists && (
        <ChecklistComments
          pagination_comments={checklists.pagination_comments}
          next_page={checklists.paginate.next_page}
          addComments={setPageCount}
          checklistID={id}
        />
      )}
    </div>
  );
};

export default ChecklistReview;
