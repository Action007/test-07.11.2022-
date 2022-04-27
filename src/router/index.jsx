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
const EditChecklistPage = React.lazy(() =>
  import("../pages/EditChecklistPage")
);
const ServerErrorPage = React.lazy(() => import("../pages/ServerErrorPage"));

const routes = [
  { id: 1, path: "/", element: <HomePage /> },
  { id: 5, path: "/our-mission", element: <OurMissionPage /> },
  { id: 6, path: "/terms-of-use", element: <TermsOfUsePage /> },
  { id: 7, path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { id: 8, path: "/support", element: <SupportPage /> },
  { id: 9, path: "/contacts", element: <ContactsPage /> },
  { id: 10, path: "/checklist-review", element: <ChecklistReviewPage /> },
  { id: 11, path: "/list/:id/:slug", element: <ChecklistReviewPage /> },
  {
    id: 12,
    path: "/active-checklists",
    element: <MyActiveChecklistsPage />,
  },
  {
    id: 13,
    path: "/passed-checklists",
    element: <MyActiveChecklistsPage />,
  },
  { id: 14, path: "/active-checklist", element: <ActiveChecklistPage /> },
  {
    id: 15,
    path: "/creation-of-checklist",
    element: <CreationOfChecklistPage />,
  },
  {
    id: 16,
    path: "/edit-checklist/:id",
    element: <EditChecklistPage />,
  },
  { id: 17, path: "/saved-checklists", element: <AllChecklistsPage /> },
  { id: 18, path: "/liked-checklists", element: <AllChecklistsPage /> },
  { id: 19, path: "/created-checklists", element: <AllChecklistsPage /> },
  { id: 20, path: "/my-profile", element: <MyProfilePage /> },
  { id: 21, path: "/edit-profile", element: <EditProfilePage /> },
  { id: 22, path: "/account-settings", element: <AccountSettingsPage /> },
  { id: 23, path: "/sign-in", element: <SignInSignUpPage /> },
  { id: 24, path: "/sign-up", element: <SignInSignUpPage /> },
  { id: 25, path: "/sign-in/reset", element: <SignInSignUpPage /> },
  { id: 26, path: "/sign-in/reset-password", element: <SignInSignUpPage /> },
  { id: 27, path: "/*", element: <NotFoundPage /> },
  { id: 28, path: "/not-found", element: <NotFoundPage /> },
  { id: 29, path: "/error", element: <ServerErrorPage /> },
  { id: 30, path: "error", element: <ServerErrorPage /> },
];

export default routes;
