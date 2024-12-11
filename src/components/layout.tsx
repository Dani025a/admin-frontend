import React from "react";
import Sidebar from "./sidebar/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "300px", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
