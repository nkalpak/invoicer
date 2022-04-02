/* eslint-disable eqeqeq */
import { DocumentTitle } from "../../lib/helmet";
import { useMatches } from "react-location";
import { LocationGenerics } from "../../lib/react-location";

function usePageTitle() {
  const matches = useMatches<LocationGenerics>();
  const match = matches[matches.length - 1];

  if (
    match == undefined ||
    match.route == undefined ||
    match.route.meta?.title == undefined
  ) {
    return "Invoicer";
  }

  return match.route.meta.title;
}

function PageTitle() {
  const pageTitle = usePageTitle();
  return <DocumentTitle title={pageTitle} />;
}

export { usePageTitle, PageTitle };
