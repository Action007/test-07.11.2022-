import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ChecklistShareButton.scss";

import { ReactComponent as ShareSvg } from "../../../../assets/images/icon/share.svg";

const ChecklistShareButton = ({ linkToCopy }) => {
  const { t: translate } = useTranslation();
  const [text, setText] = useState(translate("checklistReviewPage.share"));

  const onShareClickHandler = () => {
    navigator.clipboard.writeText(linkToCopy);
    setText(translate("checklistReviewPage.copied"));
    setTimeout(() => setText(translate("checklistReviewPage.share")), 5000);
  };

  return (
    <div className="share-button SFPro-500">
      <button
        onClick={onShareClickHandler}
        className="share-button__button"
        type="button"
      >
        <ShareSvg />
      </button>
      <span className="share-button__desc">{text}</span>
    </div>
  );
};

export default ChecklistShareButton;
