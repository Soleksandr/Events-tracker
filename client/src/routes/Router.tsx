import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Test from "./Test/Test-container";
import { Login } from "./Login/Login";

const Routes = {
  test: "/test",
  login: "/login"
};

const Router = () => (
  <Switch>
    <Route exact path={Routes.test} component={Test} />
    <Route exact path={Routes.login} component={Login} />
  </Switch>
);

export default Router;
