import { createElement, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Global/Context/globalContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { routesConfig } from "./app.routes";
import { IRoute } from "../interfaces/IRoute";

interface Context {
  dispatchUser?: any;
  user?: User;
}

interface User {
  loggedIn: boolean;
}

export function AppRouter() {
  const { user }: Context = useContext(AuthContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
      setAuthChecked(true);
  }, [user]);

  const redirectPath = !user?.loggedIn ? '/auth/login' : '/dashboard';

  const getPrivateRoute = (route: IRoute) => {
    return user?.loggedIn ? (
      <Route key={route.title} path={route.path} element={createElement(route.element)} />
    ) : (
      null
    );
  };

  const getRoute = (route: IRoute) => {
    return route.private ? (
      getPrivateRoute(route)
    ) : (
      //element is a component so we need to create an instance of it
      <Route key={route.title} path={route.path} element={createElement(route.element)} />
    );
  };

  return (
    authChecked ? (
    <Routes>
      {routesConfig.map((route) => getRoute(route))}
      {redirectPath && <Route key="redirect" path="/*" element={<Navigate to={redirectPath} />} />}
    </Routes>
    ) : (
      null
    )
  );
}
