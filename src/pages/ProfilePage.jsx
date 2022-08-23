import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFetchAccountWithNicknameQuery } from "../services/accountService";
import Profile from "../components/components/Profile/Profile";
import isServerError from "../utils/isServerError";

const ProfilePage = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { nickname } = useParams();
  const {
    data: user,
    isFetching,
    isError,
    error,
  } = useFetchAccountWithNicknameQuery(nickname, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (error && error?.data?.message[0]?.type === "invalid") {
      navigate("/not-found", { replace: true });
      return;
    }
    if (isServerError(error?.status)) {
      navigate("/error", { replace: true });
    }
  }, [isError]);

  return (
    <>
      <Helmet>
        <title>
          {user && user.is_current_user
            ? `${translate("profilePage.myProfile")} | ${nickname}`
            : `${translate("profilePage.profile")} | ${nickname}`}
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Profile user={user} isFetching={isFetching} />
    </>
  );
};

export default ProfilePage;
