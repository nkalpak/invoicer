import { Helmet } from "react-helmet";

function DocumentTitle({ title }: { title: string }) {
  return <Helmet title={title} />;
}

export { DocumentTitle };
