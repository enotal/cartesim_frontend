import React from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
} from "@coreui/react";
import { FaBars, FaEyeSlash } from "react-icons/fa";
import { SidebarNav } from "../components/SidebarNav.js";
import navigation from "../components/_nav.js";

export const AppSidebar = ({
  isAuthenticated,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  if (isAuthenticated) {
    return (
      <CSidebar
        className="border-end border-top border-bottom border-start sidebar"
        narrow={isSidebarOpen}
        // unfoldable={true}
      >
        <CSidebarHeader className="border-bottom py-1">
          <CSidebarBrand className="ms-auto">
            {isSidebarOpen && <FaBars className="" onClick={onToggleSidebar} />}
            {!isSidebarOpen && (
              <FaEyeSlash className="" onClick={onToggleSidebar} />
            )}
          </CSidebarBrand>
        </CSidebarHeader>
        <SidebarNav items={navigation.admin} />
      </CSidebar>
    );
  }
};
