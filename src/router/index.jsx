import React from "react";

const TermsOfUsePage = React.lazy(() => import("../pages/TermsOfUsePage"));
const OurMissionPage = React.lazy(() => import("../pages/OurMissionPage"));
const PrivacyPolicyPage = React.lazy(() =>
  import("../pages/PrivacyPolicyPage")
);
const SupportPage = React.lazy(() => import("../pages/SupportPage"));
const ContactsPage = React.lazy(() => import("../pages/ContactsPage"));
const AllChecklistsPage = React.lazy(() =>
  import("../pages/AllChecklistsPage")
);
const ChecklistDetailPage = React.lazy(() =>
  import("../pages/ChecklistDetailPage")
);
const MyChecklistPage = React.lazy(() => import("../pages/MyChecklistPage"));

const routes = [
  { id: 1, path: "/our-mission", element: <OurMissionPage /> },
  { id: 2, path: "/terms-of-use", element: <TermsOfUsePage /> },
  { id: 3, path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { id: 4, path: "/support", element: <SupportPage /> },
  { id: 5, path: "/contacts", element: <ContactsPage /> },
  { id: 6, path: "/all-checklists", element: <AllChecklistsPage /> },
  { id: 7, path: "/checklist-detail", element: <ChecklistDetailPage /> },
  { id: 8, path: "/my-checklist", element: <MyChecklistPage /> },
];

export default routes;
