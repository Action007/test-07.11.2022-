import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import uniqueID from "../../../utils/uniqueId";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Checklist from "../Checklist/Checklist";
import PaginationChecklist from "../Pagination/Pagination";
import Tabs from "../Tabs/Tabs";

const items = {
  type: "created",
  items: [
    {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      viewed: 100,
      liked: 5,
      created_at: "2022-02-22T05:00:00",
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
        {
          type: "Pellentesque eu, pretium.",
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
      created_at: "2020-10-15T00:00:00",
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
      created_at: "2020-02-22T00:00:00",
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

const AllChecklists = () => {
  const [checklists, setCheckLists] = useState(items);
  const [category, setCategory] = useState(true);
  const { t: translate } = useTranslation();

  const breadcrumbs = [{ title: translate("AllChecklistsPage.title") }];
  const tabs = [
    { id: 1, name: translate("AllChecklistsPage.created") },
    { id: 2, name: translate("AllChecklistsPage.liked") },
    { id: 3, name: translate("AllChecklistsPage.saved") },
  ];

  const changeChecklistsHandler = (c) => {
    setCheckLists(items);
    setCategory(c === "Created");
  };

  const lists = checklists.items.map((checklist) => (
    <Checklist
      key={uniqueID()}
      checklists={checklist}
      translate={translate("AllChecklistsPage.showMore")}
      created={category}
    />
  ));

  return (
    <div className="pb-7">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container-wrap">
        <h2 className="mb-5 display-4 text-center SFPro-600">
          {translate("AllChecklistsPage.title")}
        </h2>
        <Tabs changeHandler={changeChecklistsHandler} tabs={tabs} />
        <div className="checklist">{lists}</div>
      </div>
      <PaginationChecklist />
    </div>
  );
};

export default AllChecklists;
