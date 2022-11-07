import React from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const SignInPage = React.lazy(() => import("../pages/SignInPage"));
const SignUpPage = React.lazy(() => import("../pages/SignUpPage"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/sign-up", element: <SignUpPage /> },
  { path: "/sign-in", element: <SignInPage /> },
]);

export default router;
