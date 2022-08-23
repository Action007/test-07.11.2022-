import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteChecklistMutation } from "../../../services/checklistService";
import ChecklistItem from "../ChecklistItem/ChecklistItem";
import ChecklistTags from "./ChecklistButtons/ChecklistTags";
import ChecklistSave from "./ChecklistButtons/ChecklistSave";
import ChecklistComplain from "./ChecklistButtons/ChecklistComplain";
import ChecklistStartButton from "./ChecklistButtons/ChecklistStartButton";
import getTime from "../../../utils/getTime";
import useMediaQuery from "../../../hooks/useMediaQuery";
import LikeDislikeViewButtons from "../LikeDislikeViewButtons/LikeDislikeViewButtons";
import EditDropdown from "../EditDropdown/EditDropdown";
import checkTime from "../../../utils/checkTime";
import "./Checklist.scss";

import { ReactComponent as DotsSvg } from "../../../assets/images/icon/dots.svg";
import PopupDeleteChecklist from "../PopupDeleteChecklist/PopupDeleteChecklist";

const Checklist = ({
  checklist,
  setNotification,
  setLinkToActiveChecklist,
  page,
  isPreview,
}) => {
  const {
    id,
    checklist_items,
    created_at,
    liked,
    unliked,
    name,
    slug,
    tags,
    user_track,
    viewed,
    completed,
  } = checklist;
  const token = useSelector((state) => state.authSliceReducer.token);

  const [deleteChecklist] = useDeleteChecklistMutation();

  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const showOnMobile = useMediaQuery("(max-width:575px)");
  const { date } = getTime(created_at);
  const { pathname, search } = useLocation();
  const [modalShow, setModalShow] = useState(false);

  const checklistItems =
    page !== "checklist-detail"
      ? checklist_items
          .map((item) =>
            item.list_type !== "text" ? { ...item, list_type: "text" } : item
          )
          .slice(0, 5)
      : checklist_items;

  const time = (
    <time className="checklist__time" dateTime={date}>
      <span className="checklist__date">{date}</span>
    </time>
  );

  const onUpdateHandler = () => {
    navigate(`/edit-checklist/${id}`);
  };

  const onDeleteHandler = () => {
    deleteChecklist(id);
    setModalShow(false);
  };

  return (
    <>
      <PopupDeleteChecklist
        deleteHandler={onDeleteHandler}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="checklist">
        <div className="checklist__heading">
          <h3
            className={`checklist__title SFPro-700${
              completed ? " completed" : ""
            }`}
          >
            {page === "checklist-detail" ? (
              name
            ) : (
              <Link
                to={`/${
                  pathname !== "/active-checklists"
                    ? "checklist"
                    : "active-checklist"
                }/${id}/${slug}`}
              >
                {name}
              </Link>
            )}
          </h3>
          <div className="checklist__head">
            {showOnMobile && time}
            {page === "created-checklists" && (
              <EditDropdown
                isEdit={checkTime(created_at)}
                id={id}
                navigate={navigate}
                updateHandler={onUpdateHandler}
                deleteHandler={() => setModalShow(true)}
              />
            )}
            {page !== "created-checklists" && !isPreview && (
              <div className="checklist__btns">
                <ChecklistSave
                  token={token}
                  id={id}
                  saved={user_track?.saved}
                  navigate={navigate}
                />
                <ChecklistComplain
                  token={token}
                  id={id}
                  name={name}
                  navigate={navigate}
                  translate={translate}
                />
              </div>
            )}
          </div>
        </div>
        <ol
          className={`checklist__items${
            page === "checklist-detail" ? " detail" : ""
          }`}
        >
          {checklistItems.map(
            // eslint-disable-next-line no-shadow
            ({ description, list_type, value, completed }, index) => (
              <ChecklistItem
                // eslint-disable-next-line react/no-array-index-key
                key={description + list_type + value + index}
                description={description}
                list_type={list_type}
                value={value}
                completed={page !== "checklist-detail" && completed}
              />
            )
          )}
        </ol>
        {page !== "checklist-detail" && (
          <Link
            className="checklist__dots SFPro-600"
            to={`/${
              pathname !== "/active-checklists"
                ? "checklist"
                : "active-checklist"
            }/${id}/${slug}`}
          >
            <DotsSvg />
          </Link>
        )}
        <ChecklistTags
          tags={tags}
          isPreview={isPreview}
          navigate={navigate}
          pathname={pathname}
          search={search}
        />
        {!isPreview && (
          <div className="checklist__wrap">
            {page === "checklist-detail" && (
              <ChecklistStartButton
                token={token}
                id={id}
                setNotification={setNotification}
                setLinkToActiveChecklist={setLinkToActiveChecklist}
                navigate={navigate}
                translate={translate}
              />
            )}
            <div
              className={`checklist__box${
                page === "checklist-detail" ? " detail" : ""
              }`}
            >
              <LikeDislikeViewButtons
                liked={liked}
                unliked={unliked}
                viewed={viewed}
                checklistID={id}
                userTrack={user_track}
              />
              {!showOnMobile && time}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checklist;
