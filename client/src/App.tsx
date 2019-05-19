import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
