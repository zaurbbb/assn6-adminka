import React, {
  Suspense,
  useEffect,
} from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import CustomSpin from "../../components/CustomSpin";
import AuthLayout from "../../design/PublicDesign";
import DashboardLayout from "../../design/PrivateDesign";
import { useIsAuthStore } from "../../zustand/useIsAuth";

import {
  privateRoutes,
  publicRoutes,
} from "../routes";

function RouterProvider() {
  const { isAuth, changeIsAuth } = useIsAuthStore();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      changeIsAuth();
    }
  }, [ localStorage.getItem("accessToken") ]);

  const defaultRoute = isAuth ? "/users" : "/login";

  return (
    <>
      {!isAuth && (
        <AuthLayout>
          <Suspense
            fallback={
              <CustomSpin />
            }
          >
            <Routes>
              {publicRoutes.map((route) =>
                <Route
                  key={route.path}
                  {...route}
                />,
              )}
              <Route
                path="*"
                element={(
                  <Navigate
                    to={defaultRoute}
                    replace
                  />
                )}
              />
            </Routes>
          </Suspense>
        </AuthLayout>
      )}

      {isAuth && (
        <DashboardLayout>
          <Suspense
            fallback={
              <CustomSpin />
            }
          >
            <Routes>
              {privateRoutes.map((route) =>
                <Route
                  key={route.path}
                  {...route}
                />,
              )}
              <Route
                path="*"
                element={(
                  <Navigate
                    to={defaultRoute}
                    replace
                  />
                )}
              />
            </Routes>
          </Suspense>
        </DashboardLayout>
      )}
    </>
  );
}

export default RouterProvider;