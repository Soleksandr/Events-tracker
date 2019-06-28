import Router from "./routes/Router";
import Layout from "./layout/Layout";
import LuxonUtils from "@date-io/luxon";
import React, { useEffect } from "react";
import persister from "./services/Persister";
import { Dispatch } from "redux";
import { BrowserRouter } from "react-router-dom";
import { USER_LOGGED_IN } from "./redux/action-types/users";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./App.css";

interface IAppProps {
  dispatch: Dispatch;
}

const App: React.FC<IAppProps> = ({ dispatch }) => {
  useEffect(() => {
    const user = persister.getData("user");

    if (user) {
      dispatch({
        type: USER_LOGGED_IN,
        payload: user
      });
    }
  }, [ dispatch ]);

  return (
    <BrowserRouter>
      <Layout>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Router />
        </MuiPickersUtilsProvider>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
