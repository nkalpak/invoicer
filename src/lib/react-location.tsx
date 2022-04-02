import { MakeGenerics, ReactLocation, Router } from "react-location";
import { PropsWithChildren } from "react";
import { OnboardingPage } from "../features/onboarding/pages/onboarding-page";
import { HomePage } from "../features/home/pages/home-page";
import { EditSenderPage } from "../features/home/pages/edit-sender-page";
import { EditReceiverPage } from "../features/home/pages/edit-receiver-page";

export type LocationGenerics = MakeGenerics<{
  RouteMeta: {
    title: string;
  };
}>;
const location = new ReactLocation();

export function ReactLocationProvider({ children }: PropsWithChildren<{}>) {
  return (
    <Router
      routes={[
        {
          path: "/onboarding",
          element: <OnboardingPage />,
          meta: {
            title: "Onboarding",
          },
        },
        {
          path: "/",
          element: <HomePage />,
          meta: {
            title: "Home",
          },
        },
        {
          path: "/edit-sender",
          element: <EditSenderPage />,
          meta: {
            title: "Edit sender",
          },
        },
        {
          path: "/edit-receiver",
          element: <EditReceiverPage />,
          meta: {
            title: "Edit receiver",
          },
        },
      ]}
      location={location}
    >
      {children}
    </Router>
  );
}
