import React, { useState, useEffect } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { AppFooter } from "./AppFooter";
import { isAuthenticated } from "../authService";

const DefaultLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-layout">
      <AppHeader isAuthenticated={isAuthenticated()} />
      <div className="content-wrapper">
        <AppSidebar
          className=""
          isAuthenticated={isAuthenticated()}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
        <main className={`main-content`}>
          {children}
          <AppFooter />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
