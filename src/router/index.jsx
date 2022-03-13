import React from "react";
import { Navigate } from "react-router-dom";

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
const ChecklistReviewPage = React.lazy(() =>
  import("../pages/ChecklistReviewPage")
);
const MyActiveChecklistsPage = React.lazy(() =>
  import("../pages/MyActiveChecklistsPage")
);
const ActiveChecklistPage = React.lazy(() =>
  import("../pages/ActiveChecklistPage")
);
const CreationOfChecklistPage = React.lazy(() =>
  import("../pages/CreationOfChecklistPage")
);
const HomePage = React.lazy(() => import("../pages/HomePage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));

const routes = [
  { id: 1, path: "/home", element: <HomePage /> },
  { id: 2, path: "/our-mission", element: <OurMissionPage /> },
  { id: 3, path: "/terms-of-use", element: <TermsOfUsePage /> },
  { id: 4, path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { id: 5, path: "/support", element: <SupportPage /> },
  { id: 6, path: "/contacts", element: <ContactsPage /> },
  { id: 7, path: "/all-checklists", element: <AllChecklistsPage /> },
  { id: 8, path: "/checklist-review", element: <ChecklistReviewPage /> },
  { id: 9, path: "/my-active-checklists", element: <MyActiveChecklistsPage /> },
  { id: 10, path: "/active-checklist", element: <ActiveChecklistPage /> },
  {
    id: 11,
    path: "/creation-of-checklist",
    element: <CreationOfChecklistPage />,
  },
  { id: 12, path: "/saved-checklists", element: <AllChecklistsPage /> },
  { id: 12, path: "/profile", element: <ProfilePage /> },
  { id: 13, path: "/", element: <Navigate to="/home" /> },
  { id: 14, path: "/*", element: <NotFoundPage /> },
];

export default routes;
