import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SignInSignUp from "../components/components/SignInSignUp/SignInSignUp";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const SignUpPage = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.authSliceReducer.token);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/not-found");
  }, [token]);

  return (
    <>
      {pathname === "/sign-in" && (
        <Helmet>
          <title>
            {translate("login.signIn")} | {translate("seo.signIn.title")}
          </title>
          <meta property="og:title" content={translate("seo.signIn.title")} />
          <meta name="description" content={translate("seo.signIn.desc")} />
          <meta
            property="og:description"
            content={translate("seo.signIn.desc")}
          />
          <meta property="og:url" content={HOSTNAME + pathname} />
        </Helmet>
      )}
      {pathname === "/sign-up" && (
        <Helmet>
          <title>
            {translate("login.signUp")} | {translate("seo.signUp.title")}
          </title>
          <meta name="description" content={translate("seo.signUp.desc")} />
          <meta property="og:title" content={translate("seo.signUp.title")} />
          <meta
            property="og:description"
            content={translate("seo.signUp.desc")}
          />
          <meta property="og:url" content={HOSTNAME + pathname} />
        </Helmet>
      )}
      {pathname === "/sign-in/reset" && (
        <Helmet>
          <title>
            {translate("login.forgot")} | {translate("seo.signInReset.title")}
          </title>
          <meta
            property="og:title"
            content={translate("seo.signInReset.title")}
          />
          <meta
            name="description"
            content={translate("seo.signInReset.desc")}
          />
          <meta
            property="og:description"
            content={translate("seo.signInReset.desc")}
          />
          <meta property="og:url" content={HOSTNAME + pathname} />
        </Helmet>
      )}
      {pathname === "/sign-in/reset-password" && (
        <Helmet>
          <title>
            {translate("login.title4")} |{" "}
            {translate("seo.signInResetPassword.title")}
          </title>
          <meta
            property="og:title"
            content={translate("seo.signInResetPassword.title")}
          />
          <meta
            name="description"
            content={translate("seo.signInResetPassword.desc")}
          />
          <meta
            property="og:description"
            content={translate("seo.signInResetPassword.desc")}
          />
          <meta property="og:url" content={HOSTNAME + pathname} />
        </Helmet>
      )}
      <SignInSignUp pathname={pathname} />
    </>
  );
};

export default SignUpPage;
