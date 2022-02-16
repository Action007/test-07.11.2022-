import React from "react";

const TermsOfUsePage = React.lazy(() => import("../pages/TermsOfUsePage"));
const OurMissionPage = React.lazy(() => import("../pages/OurMissionPage"));
const PrivacyPolicyPage = React.lazy(() =>
  import("../pages/PrivacyPolicyPage")
);
const SupportPage = React.lazy(() => import("../pages/SupportPage"));
const ContactsPage = React.lazy(() => import("../pages/ContactsPage"));

const routes = [
  { id: 1, path: "/Our-Mission", element: <OurMissionPage /> },
  { id: 2, path: "/Terms-Of-Use", element: <TermsOfUsePage /> },
  { id: 3, path: "/Privacy-Policy", element: <PrivacyPolicyPage /> },
  { id: 4, path: "/Support", element: <SupportPage /> },
  { id: 5, path: "/Contacts", element: <ContactsPage /> },
];

export default routes;
