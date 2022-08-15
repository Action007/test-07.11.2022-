import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChecklistSkeleton from "../../UI/ChecklistSkeleton/ChecklistSkeleton";
import Notification from "../../UI/Notification/Notification";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ChecklistComments from "../ChecklistComments/ChecklistComments";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";

const ChecklistReview = ({ checklist, setPageCount, id, isFetching }) => {
  const [notification, setNotification] = useState(false);
  const [linkToActiveChecklist, setLinkToActiveChecklist] = useState("");
  const user = useSelector((state) => state.authSliceReducer.user);
  const { t: translate } = useTranslation();
  const breadcrumbs = user
    ? [
        {
          title: translate("allChecklistsPage.title"),
          link: "/created-checklists?search_type=created&page=1&per_page=10",
        },
        { title: checklist ? checklist.checklist.name : "" },
      ]
    : [{ title: checklist ? checklist.checklist.name : "" }];

  return (
    <>
      {notification && (
        <Notification
          translate={translate("notification.alreadyAdded")}
          link={linkToActiveChecklist}
          isError
        />
      )}
      <div
        className={`checklist-detail container container-breadcrumb pb-8${
          notification ? " show-notification" : ""
        }`}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {isFetching && <ChecklistSkeleton />}
        {checklist && !isFetching && (
          <ChecklistDetail
            checklist={checklist.checklist}
            setNotification={setNotification}
            setLinkToActiveChecklist={setLinkToActiveChecklist}
            detailPage
          />
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
    </>
  );
};

export default ChecklistReview;
