import Router from "./routes/Router";
import Layout from "./layout/Layout";
import React, { useEffect } from "react";
import persister from "./services/Persister";
import { Dispatch } from "redux";
import { BrowserRouter } from "react-router-dom";
import { USER_LOGGED_IN } from "./redux/action-types/users";
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
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
