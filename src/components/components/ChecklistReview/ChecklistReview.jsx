import React from "react";
import { useTranslation } from "react-i18next";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ChecklistComments from "../ChecklistComments/ChecklistComments";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";

const ChecklistReview = ({
  checklist,
  setPageCount,
  id,
  isLoading,
  isFetching,
}) => {
  const { t: translate } = useTranslation();
  const breadcrumbs = [
    { title: translate("allChecklistsPage.title"), link: -1 },
    { title: checklist ? checklist.checklist.name : "" },
  ];

  return (
    <div className="checklist-detail container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading && <LoadingSkeleton />}
      {checklist && (
        <ChecklistDetail checklist={checklist.checklist} detailPage />
      )}
      {checklist && (
        <ChecklistComments
          commentsTotalCount={checklist.paginate.total_comments_value}
          pagination_comments={checklist.pagination_comments}
          next_page={checklist.paginate.next_page}
          addComments={setPageCount}
          checklistID={id}
          loadingComments={isFetching}
        />
      )}
    </div>
  );
};

export default ChecklistReview;
