import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import checkTime from "../../../utils/checkTime";
import ChecklistSkeleton from "../../UI/ChecklistSkeleton/ChecklistSkeleton";
import Notification from "../../UI/Notification/Notification";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import ChecklistComments from "../ChecklistComments/ChecklistComments";

const ChecklistReview = ({ checklist, id, isFetching }) => {
  const [notification, setNotification] = useState(false);
  const [linkToActiveChecklist, setLinkToActiveChecklist] = useState("");
  const { t: translate } = useTranslation();
  const isLessThanTwoHours = checkTime(checklist?.checklist?.created_at);
  const isCurrentUser = checklist?.checklist?.creator?.is_current_user;

  const breadcrumbs = useMemo(() => {
    if (checklist?.checklist?.user_track?.created) {
      return [
        {
          title: translate("allChecklistsPage.title"),
          link: "/created-checklists?search_type=created&page=1&per_page=10",
        },
        { title: checklist.checklist.name },
      ];
    }
    if (checklist?.checklist?.user_track?.liked) {
      return [
        {
          title: translate("allChecklistsPage.title"),
          link: "/liked-checklists?search_type=liked&page=1&per_page=10",
        },
        { title: checklist.checklist.name },
      ];
    }
    if (checklist?.checklist?.user_track?.saved) {
      return [
        {
          title: translate("allChecklistsPage.title"),
          link: "/saved-checklists?search_type=saved&page=1&per_page=10",
        },
        { title: checklist.checklist.name },
      ];
    }
    return [
      { title: checklist?.checklist.name ? checklist.checklist.name : "" },
    ];
  }, [checklist]);

  return (
    <>
      {notification && (
        <Notification
          translate={translate("notification.alreadyAdded")}
          link={linkToActiveChecklist}
          isError
        />
      )}
      {isLessThanTwoHours && isCurrentUser && !notification && (
        <Notification
          translate={translate("notification.2hours")}
          link={linkToActiveChecklist}
        />
      )}
      <div
        className={`checklist-detail container container-breadcrumb pb-8${
          notification || (isLessThanTwoHours && isCurrentUser)
            ? " show-notification"
            : ""
        }`}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {isFetching && <ChecklistSkeleton />}
        {checklist && !isFetching && (
          <Checklist
            checklist={checklist.checklist}
            setNotification={setNotification}
            setLinkToActiveChecklist={setLinkToActiveChecklist}
            page="checklist-detail"
          />
        )}
        {checklist && (
          <ChecklistComments
            checklistComments={checklist.pagination_comments}
            comments_paginate={checklist.paginate}
            checklistID={id}
          />
        )}
      </div>
    </>
  );
};

export default ChecklistReview;
