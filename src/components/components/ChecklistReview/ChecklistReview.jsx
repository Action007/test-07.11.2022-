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
  checklist_items: [
    {
      list_type: "text",
      description: "Need add text1 1",
      value: {},
    },
    {
      list_type: "link",
      description: "Need add link 1",
      value: {
        link: "https://translate.google.by/",
      },
    },
    {
      list_type: "image",
      description: "Need add image 1",
      value: {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/HPMOR_Yudkowsky.jpg/220px-HPMOR_Yudkowsky.jpg",
      },
    },
    {
      list_type: "coordinates",
      description: "Need add coordinates 1",
      value: {
        coordinates: {
          lat: 52.4134686,
          lon: 16.9604093,
        },
      },
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
      <ChecklistDetail checklists={data} />
      <ChecklistComments comments={data.comments} />
    </div>
  );
};

export default ChecklistReview;
