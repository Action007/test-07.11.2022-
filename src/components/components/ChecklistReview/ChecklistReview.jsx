import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { checklistAPI } from "../../../services/checklistService";
import LoadingSkeleton from "../../UI/LoadingSkeleton/LoadingSkeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ChecklistComments from "../ChecklistComments/ChecklistComments";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";

const items = {
  comments: [
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 2,
      dislikes: 10,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      likes: 0,
      dislikes: 0,
      user: {
        id: 5,
        nickname: "Alex67",
        created_at: "2020-10-22T00:00:00",
      },
    },
  ],
};

const ChecklistReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: checklists,
    error,
    isLoading,
  } = checklistAPI.useFetchChecklistQuery(`/api/v1/checklists_auth/${id}`);
  const { t: translate } = useTranslation();
  const breadcrumbs = [{ title: translate("checklistReviewPage.title") }];

  return (
    <div className="checklist-detail container pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading && <LoadingSkeleton />}
      {error && navigate("/error")}
      {checklists && <ChecklistDetail checklists={checklists} detailPage />}
      <ChecklistComments comments={items.comments} />
    </div>
  );
};

export default ChecklistReview;
