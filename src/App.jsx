import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoginSliceActions } from "./store/isLoginSlice";
import Layout from "./components/UI/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import routes from "./router";
import "./App.scss";
import "leaflet/dist/leaflet.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoginSliceActions.tokenVerification());
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
