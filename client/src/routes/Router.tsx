import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Test from "./Test/Test-container";

const Routes = {
  test: "/test"
};

const Router = () => (
  <BrowserRouter>
    <Route exact path={Routes.test} component={Test} />
  </BrowserRouter>
);

export default Router;
