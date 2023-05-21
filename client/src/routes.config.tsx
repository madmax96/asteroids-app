import { FC, Suspense, lazy } from "react";
import { createBrowserRouter, useRouteError } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const AsteroidPage = lazy(() => import("./pages/AsteroidPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
import { DefaultLayout } from "./layout";

function ErrorBoundary() {
  const error = useRouteError() as Error | undefined;
  return (
    <DefaultLayout>
      <Alert severity="error">
        {error?.message ?? "Unexpected Error.Contact customer support"}
      </Alert>
    </DefaultLayout>
  );
}

type SuspenseFallbackParams = {
  Layout?: FC;
};

const SuspenseFallback: FC<SuspenseFallbackParams> = ({
  Layout = DefaultLayout,
}) => {
  return (
    <Layout>
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    </Layout>
  );
};

type PageWrapperParams = {
  Page: FC;
  Layout?: FC;
};

const PageWrapper: FC<PageWrapperParams> = ({
  Page,
  Layout = DefaultLayout,
}) => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Layout>
        <Page />
      </Layout>
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper Page={IndexPage} />,
    ErrorBoundary,
  },
  {
    path: "/asteroids",
    element: <PageWrapper Page={IndexPage} />,
    ErrorBoundary,
  },
  {
    path: "/asteroids/:id",
    element: <PageWrapper Page={AsteroidPage} />,
    ErrorBoundary,
  },
  {
    path: "*",
    element: <PageWrapper Page={NotFoundPage} />,
    ErrorBoundary,
  },
]);
