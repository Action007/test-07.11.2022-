import React from "react";
import TermsOfUsePage from "../pages/TermsOfUsePage";
import OurMissionPage from "../pages/OurMissionPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import SupportPage from "../pages/SupportPage";

const routes = [
  { id: 1, path: "/Our-Mission", element: <OurMissionPage /> },
  { id: 2, path: "/Terms-Of-Use", element: <TermsOfUsePage /> },
  { id: 3, path: "/Privacy-Policy", element: <PrivacyPolicyPage /> },
  { id: 4, path: "/Support", element: <SupportPage /> },
];

export default routes;
