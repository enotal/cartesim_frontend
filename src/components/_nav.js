import React from "react";
import { CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

const _nav = {
  admin: [
    {
      component: CNavItem,
      name: "Accueil",
      to: "/",
      meta: { role: ["Admin", "Recruiter"] },
      icon: <CIcon icon={icon.cilHome} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Connexion",
      to: "/login",
      meta: { role: ["Admin", "Recruiter"] },
      icon: <CIcon icon={icon.cilLockLocked} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Tableau de bord",
      to: "/dashboard",
      meta: { role: ["Admin", "Recruiter"] },
      icon: <CIcon icon={icon.cilChartPie} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Rôles",
      to: "/roles",
      meta: { role: ["Admin", "Recruiter"] },
      icon: <CIcon icon={icon.cilGroup} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Utilisateurs",
      to: "/users",
      meta: { role: ["Admin", "Recruiter"] },
      icon: <CIcon icon={icon.cilUserX} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Travailleurs",
      to: "/travailleurs",
      meta: { role: ["Admin", "Recruiter"] },
      icon: <CIcon icon={icon.cilUser} customClassName="nav-icon" />,
    },
  ],
};

export default _nav;
