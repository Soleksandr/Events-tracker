import React from "react";
import Header from "./components/Header";

const Layout: React.SFC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
