import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { authSliceActions } from "./store/authSlice";
import Layout from "./components/UI/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import routes from "./router";
import "./App.scss";
import "leaflet/dist/leaflet.css";

const API_KEY = process.env.REACT_APP_HOSTNAME;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSliceActions.tokenVerification());
  }, []);

  return (
    <>
      <Helmet>
        <title>Checklists</title>
        <meta property="og:title" content="Checklist" />
        <meta property="og:url" content={API_KEY} />
        <meta name="description" content="Checklist" />
        <meta property="og:site_name" content="Checklist" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
      </Helmet>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
