import React from "react";

const TermsOfUsePage = React.lazy(() => import("../pages/TermsOfUsePage"));
const OurMissionPage = React.lazy(() => import("../pages/OurMissionPage"));
const PrivacyPolicyPage = React.lazy(() =>
  import("../pages/PrivacyPolicyPage")
);
const SupportPage = React.lazy(() => import("../pages/SupportPage"));
const ContactsPage = React.lazy(() => import("../pages/ContactsPage"));
const MyChecklistsPage = React.lazy(() => import("../pages/MyChecklistsPage"));
const ChecklistDetailPage = React.lazy(() =>
  import("../pages/ChecklistDetailPage")
);

const routes = [
  { id: 1, path: "/Our-Mission", element: <OurMissionPage /> },
  { id: 2, path: "/Terms-Of-Use", element: <TermsOfUsePage /> },
  { id: 3, path: "/Privacy-Policy", element: <PrivacyPolicyPage /> },
  { id: 4, path: "/Support", element: <SupportPage /> },
  { id: 5, path: "/Contacts", element: <ContactsPage /> },
  { id: 6, path: "/My-Checklists", element: <MyChecklistsPage /> },
  { id: 7, path: "/Checklist-Detail", element: <ChecklistDetailPage /> },
];

export default routes;
