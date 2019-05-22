import * as React from "react";
import Home from "./Home/Home-container";
import Login from "./Login/Login-container";
import Register from "./Register/Register-container";
import { Route, Switch } from "react-router-dom";

const Routes = {
  home: "/",
  login: "/login",
  register: "/register"
};

const Router = () => (
  <Switch>
    <Route
      exact
      path={Routes.home}
      component={Home}
    />
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
