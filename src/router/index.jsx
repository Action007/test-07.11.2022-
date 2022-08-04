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
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const EditProfilePage = React.lazy(() => import("../pages/EditProfilePage"));
const AccountSettingsPage = React.lazy(() =>
  import("../pages/AccountSettingsPage")
);
const SignInSignUpPage = React.lazy(() => import("../pages/SignInSignUpPage"));
const SignInWithGoogle = React.lazy(() =>
  import("../components/components/SignInWithGoogle/SignInWithGoogle")
);
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
  { id: 11, path: "/checklist/:id/:slug", element: <ChecklistReviewPage /> },
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
  {
    id: 14,
    path: "/active-checklist/:id",
    element: <ActiveChecklistPage />,
  },
  {
    id: 15,
    path: "/active-checklist/:id/:slug",
    element: <ActiveChecklistPage />,
  },
  {
    id: 16,
    path: "/creation-of-checklist",
    element: <CreationOfChecklistPage />,
  },
  {
    id: 17,
    path: "/edit-checklist/:id",
    element: <EditChecklistPage />,
  },
  { id: 18, path: "/saved-checklists", element: <AllChecklistsPage /> },
  { id: 19, path: "/liked-checklists", element: <AllChecklistsPage /> },
  { id: 20, path: "/created-checklists", element: <AllChecklistsPage /> },
  { id: 21, path: "/my-profile", element: <ProfilePage /> },
  { id: 22, path: "/edit-profile", element: <EditProfilePage /> },
  { id: 23, path: "/:nickname", element: <ProfilePage /> },
  { id: 24, path: "/account-settings", element: <AccountSettingsPage /> },
  { id: 25, path: "/sign-up", element: <SignInSignUpPage /> },
  { id: 26, path: "/sign-in", element: <SignInSignUpPage /> },
  { id: 27, path: "/sign-in/reset", element: <SignInSignUpPage /> },
  { id: 28, path: "/sign-in/reset-password", element: <SignInSignUpPage /> },
  { id: 29, path: "/auth/google/callback", element: <SignInWithGoogle /> },
  { id: 30, path: "/*", element: <NotFoundPage /> },
  { id: 31, path: "/not-found", element: <NotFoundPage /> },
  { id: 32, path: "/error", element: <ServerErrorPage /> },
];

export default routes;
