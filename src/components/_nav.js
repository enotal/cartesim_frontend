import React from "react";
import { CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

const _nav = {
  admin: [
    {
      component: CNavItem,
      name: "Tableau de bord",
      to: "/dashboard",
      meta: { role: ["Admin", "Recruiter"] },
      icon: (
        <CIcon icon={icon.cilChartPie} customClassName="nav-icon" />
      ),
    },
    
  ],
};

export default _nav;
