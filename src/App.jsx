import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import router from "./router";
import "rsuite/dist/rsuite.min.css";
// import "./App.scss";

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Suspense>
  );
};

export default App;
