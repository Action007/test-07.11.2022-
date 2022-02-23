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

const routes = [
  { id: 1, path: "/our-mission", element: <OurMissionPage /> },
  { id: 2, path: "/terms-of-use", element: <TermsOfUsePage /> },
  { id: 3, path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { id: 4, path: "/support", element: <SupportPage /> },
  { id: 5, path: "/contacts", element: <ContactsPage /> },
  { id: 6, path: "/all-checklists", element: <AllChecklistsPage /> },
  { id: 7, path: "/checklist-review", element: <ChecklistReviewPage /> },
  { id: 8, path: "/my-active-checklists", element: <MyActiveChecklistsPage /> },
  { id: 9, path: "/active-checklist", element: <ActiveChecklistPage /> },
  {
    id: 10,
    path: "/creation-of-checklist",
    element: <CreationOfChecklistPage />,
  },
];

export default routes;
