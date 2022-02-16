import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import uniqueID from "../../../utils/uniqueId";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../Pagination/Pagination";
import Tabs from "../Tabs/Tabs";
import "./MyChecklists.scss";

const items = {
  type: "created",
  items: [
    {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      viewed: 100,
      liked: 5,
      created_at: "2020-10-22T00:00:00",
      tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
      checklist: [
        {
          type: "Aenean massa.",
          description: "Hello world",
          value: "",
        },
        {
          type: "Cum sociis natoque penatibus et magnis.",
          description: "Image value",
          value: "https://example.com/donwload.png",
        },
        {
          type: "Dis parturient montes, nascetur ridiculus mus.",
          description: "Got to Russia, Moskow",
          value: "https://example.com/donwload.png",
        },
        {
          type: "Donec quam felis, ultricies nec, pellentesque eu, pretium.",
          description: "Letsgo to VK KOM",
          value: "https://vk.com/",
        },
        {
          type: "Pellentesque eu, pretium.",
          description: "Letsgo to VK KOM",
          value: "https://vk.com/",
        },
      ],
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      viewed: 100,
      liked: 5,
      created_at: "2020-10-22T00:00:00",
      tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
      checklist: [
        {
          type: "Aenean massa.",
          description: "Hello world",
          value: "",
        },
        {
          type: "Cum sociis natoque penatibus et magnis.",
          description: "Image value",
          value: "https://example.com/donwload.png",
        },
        {
          type: "Dis parturient montes, nascetur ridiculus mus.",
          description: "Got to Russia, Moskow",
          value: "https://example.com/donwload.png",
        },
        {
          type: "Donec quam felis, ultricies nec, pellentesque eu, pretium.",
          description: "Letsgo to VK KOM",
          value: "https://vk.com/",
        },
        {
          type: "Pellentesque eu, pretium.",
          description: "Letsgo to VK KOM",
          value: "https://vk.com/",
        },
      ],
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      viewed: 100,
      liked: 5,
      created_at: "2020-10-22T00:00:00",
      tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
      checklist: [
        {
          type: "Aenean massa.",
          description: "Hello world",
          value: "",
        },
        {
          type: "Cum sociis natoque penatibus et magnis.",
          description: "Image value",
          value: "https://example.com/donwload.png",
        },
        {
          type: "Dis parturient montes, nascetur ridiculus mus.",
          description: "Got to Russia, Moskow",
          value: "https://example.com/donwload.png",
        },
        {
          type: "Donec quam felis, ultricies nec, pellentesque eu, pretium.",
          description: "Letsgo to VK KOM",
          value: "https://vk.com/",
        },
        {
          type: "Pellentesque eu, pretium.",
          description: "Letsgo to VK KOM",
          value: "https://vk.com/",
        },
      ],
    },
  ],
  totals: 49,
  pages: 5,
  page: 1,
};

const MyChecklists = () => {
  const [checkLists, setCheckLists] = useState(items);
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("myChecklistsPage.title") }];
  const tabs = [
    { id: 1, name: "Created" },
    { id: 2, name: "Liked" },
    { id: 3, name: "Saved" },
  ];

  const changeChecklistsHandler = () => {
    setCheckLists(items);
  };

  return (
    <div className="my-checklists pb-7">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("myChecklistsPage.title")}
        </h2>
        <Tabs changeHandler={changeChecklistsHandler} tabs={tabs} />
        <ul className="my-checklists__checklists">
          {checkLists.items.map((checklist) => (
            <Checklist key={uniqueID()} checklists={checklist} />
          ))}
        </ul>
      </div>
      <PaginationChecklist />
    </div>
  );
};

export default MyChecklists;
