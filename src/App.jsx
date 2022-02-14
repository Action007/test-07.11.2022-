import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/UI/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import routes from "./router";

const App = () => (
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

export default App;
