import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import ChecklistSkeleton from "../../UI/ChecklistSkeleton/ChecklistSkeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ChecklistComments from "../ChecklistComments/ChecklistComments";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";

const ChecklistReview = (props) => {
  const { checklist, setPageCount, id, isLoading, isFetching } = props;
  const { t: translate } = useTranslation();
  const { state } = useLocation();
  const breadcrumbs =
    state?.previousPath !== "/"
      ? [
          {
            title: translate("allChecklistsPage.title"),
            link: `${
              state?.previousPath === "/created-checklists"
                ? "/created-checklists"
                : ""
            }${
              state?.previousPath === "/liked-checklists"
                ? "/liked-checklists"
                : ""
            }${
              state?.previousPath === "/saved-checklists"
                ? "/saved-checklists"
                : ""
            }?search_type=${
              state?.previousPath === "/created-checklists" ? "created" : ""
            }${state?.previousPath === "/liked-checklists" ? "liked" : ""}${
              state?.previousPath === "/saved-checklists" ? "saved" : ""
            }&page=1&per_page=10`,
          },
          { title: checklist ? checklist.checklist.name : "" },
        ]
      : [{ title: checklist ? checklist.checklist.name : "" }];

  return (
    <div className="checklist-detail container container-breadcrumb pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading && <ChecklistSkeleton />}
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
