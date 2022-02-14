import { ReactLocation, Router } from "react-location";
import { PropsWithChildren } from "react";
import { OnboardingPage } from "../features/onboarding/pages/onboarding-page";
import { HomePage } from "../features/home/pages/home-page";

const location = new ReactLocation();

export function ReactLocationProvider({ children }: PropsWithChildren<{}>) {
  return (
    <Router
      routes={[
        {
          path: "/onboarding",
          element: <OnboardingPage />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
      ]}
      location={location}
    >
      {children}
    </Router>
  );
}