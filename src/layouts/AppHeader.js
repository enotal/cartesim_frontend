import React from "react";
import logo from "../assets/brand/logo-uvbf.png";
import myAvatar from "../assets/avatars/AvatarHomme.svg";
import { FaBell, FaEnvelope, FaUserCheck, FaSignOutAlt } from "react-icons/fa";

export const AppHeader = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-0">
      <div
        className="container-fluid py-0"
        style={{ backgroundColor: "#17376e" }}
      >
        <div className="navbar-brand text-uppercase fw-bold text-light fs-6">
          <img
            src={logo}
            alt="logo"
            height={48}
            className="d-inline-block align-text-center me-2"
          />
          {isAuthenticated && "optiacademiq+"}
        </div>
        <div className="d-flex ms-auto" id="navbarNav">
          {isAuthenticated ? (
            <div className="d-flex">
              <ul className="navbar-nav ms-auto me-5">
                <li className="nav-item me-2">
                  <a
                    className="nav-link d-flex align-items-center text-light"
                    aria-current="page"
                    href="#"
                  >
                    <FaBell className="me-1" />
                    Notifications
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center text-light"
                    href="#"
                  >
                    <FaEnvelope className="me-1" />
                    Messages
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={myAvatar}
                      alt="User"
                      width="30"
                      height="30"
                      className="rounded-circle"
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end text-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaUserCheck className="me-1" />
                        Profil
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaSignOutAlt className="me-1" />
                        Déconnexion
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-end ms-5 text-light">Non connecté(e)</div>
          )}
        </div>
      </div>
    </nav>
  );
};
