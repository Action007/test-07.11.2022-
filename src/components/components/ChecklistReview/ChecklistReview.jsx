import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ChecklistComments from "../ChecklistComments/ChecklistComments";
import ChecklistDetail from "../ChecklistDetail/ChecklistDetail";

const items = {
  title:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  viewed: 100,
  liked: 5,
  created_at: "2020-10-22T00:00:00",
  tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
  checklist: [
    {
      type: "Aenean massa.",
      description: "text 1",
      value: "",
    },
    {
      type: "Cum sociis natoque penatibus et magnis.",
      description: "text 2",
      value: "",
    },
    {
      type: "Dis parturient montes, nascetur ridiculus mus.",
      description: "text 3",
      value: "",
    },
    {
      type: "Donec quam felis, ultricies nec, pellentesque eu, pretium.",
      description: "text 4",
      value: "",
    },
    {
      type: "Dis parturient montes, nascetur ridiculus mus.",
      description: "text 5",
      value: "",
    },
    {
      type: "Pellentesque eu, pretium.",
      description: "text 6",
      value: "",
    },
    {
      type: "Donec quam felis, ultricies nec, pellentesque eu, pretium",
      description: "text 7",
      value: "",
    },
    {
      type: "Donec quam felis, ultricies nec, pellentesque eu, pretium",
      description: "text 8",
      value: "",
    },
    {
      type: "Donec quam felis, ultricies nec, pellentesque eu, pretium",
      description: "text 9",
      value: "",
    },
    {
      type: "Pellentesque eu, pretium",
      description: "text 10",
      value: "",
    },
  ],
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
  const [data] = useState(items);
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("checklistReviewPage.title") }];

  return (
    <div className="pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <ChecklistDetail
        checklists={data}
        translate={translate("checklistReviewPage.button")}
      />
      <ChecklistComments comments={data.comments} />
    </div>
  );
};

export default ChecklistReview;
