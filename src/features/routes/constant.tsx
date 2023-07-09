import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { TaxisLocations } from "../all-taxi-location";
import ErrorPage from "../error/Error";
import { Location } from "../location/location";

const AuthRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const routes = [
  {
    path: "/",
    element: <AuthRoutes />,
    children: [
      {
        path: "/all-taxis-locations",
        element: <TaxisLocations />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/location",
        element: <Location />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];
