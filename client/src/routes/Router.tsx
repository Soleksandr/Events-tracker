import * as React from "react";
import Test from "./Test/Test-container";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Route, Switch } from "react-router-dom";

const Routes = {
  test: "/test",
  login: "/login",
  register: "/register"
};

const Router = () => (
  <Switch>
    <Route
      path={Routes.test}
      component={Test}
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
