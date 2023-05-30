import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import { useSelector } from "react-redux";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Determine if the user role is admin, staff, or student
  const isAdmin = userInfo && userInfo.role === "admin";
  const isStaff = userInfo && userInfo.role === "staff";
  const isStudent = userInfo && userInfo.role === "student";

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const checkRoles = (role) => {
    return userInfo?.role.includes(role);
  };

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                if (route.roles.some(checkRoles)) {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`/app${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                } else {
                  return null;
                }
              })}
              {isAdmin && <Redirect exact from="/app" to="/app/Staff" />}
              {isStaff && <Redirect exact from="/app" to="/app/Student" />}
              {isStudent && <Redirect exact from="/app" to="/app/TimeTable" />}
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
