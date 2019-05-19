import React from "react";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import "./App.css";

const App: React.FC = () => {
  return (
    <Layout>
      <Router />
    </Layout>
  );
};

export default App;
