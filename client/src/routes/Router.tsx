import * as React from "react";
import Login from "./Login/Login-container";
import Register from "./Register/Register-container";
import { Route, Switch } from "react-router-dom";

const Routes = {
  test: "/test",
  login: "/login",
  register: "/register"
};

const Router = () => (
  <Switch>
    <Route
      path={Routes.login}
      component={Login}
    />
    <Route
      path={Routes.register}
      component={Register}
    />
  </Switch>
);

export default Router;
