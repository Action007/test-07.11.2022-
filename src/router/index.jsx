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
const MyProfilePage = React.lazy(() => import("../pages/MyProfilePage"));
const EditProfilePage = React.lazy(() => import("../pages/EditProfilePage"));
const AccountSettingsPage = React.lazy(() =>
  import("../pages/AccountSettingsPage")
);
const SignInSignUpPage = React.lazy(() => import("../pages/SignInSignUpPage"));

const routes = [
  { id: 1, path: "/home", element: <HomePage /> },
  { id: 3, path: "/home/tags/:tag", element: <HomePage /> },
  { id: 4, path: "/our-mission", element: <OurMissionPage /> },
  { id: 5, path: "/terms-of-use", element: <TermsOfUsePage /> },
  { id: 6, path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { id: 7, path: "/support", element: <SupportPage /> },
  { id: 8, path: "/contacts", element: <ContactsPage /> },
  { id: 9, path: "/checklist-review", element: <ChecklistReviewPage /> },
  { id: 10, path: "/list/:id/:slug", element: <ChecklistReviewPage /> },
  {
    id: 11,
    path: "/my-active-checklists",
    element: <MyActiveChecklistsPage />,
  },
  { id: 12, path: "/active-checklist", element: <ActiveChecklistPage /> },
  {
    id: 13,
    path: "/creation-of-checklist",
    element: <CreationOfChecklistPage />,
  },
  { id: 14, path: "/saved-checklists", element: <AllChecklistsPage /> },
  { id: 15, path: "/liked-checklists", element: <AllChecklistsPage /> },
  { id: 16, path: "/created-checklists", element: <AllChecklistsPage /> },
  { id: 17, path: "/my-profile", element: <MyProfilePage /> },
  { id: 18, path: "/edit-profile", element: <EditProfilePage /> },
  { id: 19, path: "/account-settings", element: <AccountSettingsPage /> },
  { id: 20, path: "/sign-in", element: <SignInSignUpPage /> },
  { id: 21, path: "/sign-up", element: <SignInSignUpPage /> },
  { id: 22, path: "/sign-in/reset", element: <SignInSignUpPage /> },
  { id: 23, path: "/", element: <Navigate to="/home" /> },
  { id: 24, path: "/*", element: <NotFoundPage /> },
];

export default routes;
