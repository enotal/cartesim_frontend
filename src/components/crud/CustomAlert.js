import React, { useEffect, useState } from "react";

// type : success, danger, warning, info
// icon :  fa-check-circle, fa-exclamation-circle, fa-exclamation-triangle, fa-info-circle

export const CustomAlert = ({ alert }) => {
  const alerts = {
    danger: {
      icon: "fa-exclamation-circle",
      create: "",
      read: "",
      update: "",
      delete: "Echec de suppression",
      login: "Echec de connexion !",
      logout: "",
    },
    info: {
      icon: "fa-einfo-circle",
      create: "",
      read: "",
      update: "",
      delete: "",
      login: "",
      logout: "",
    },
    success: {
      icon: "fa-check-circle",
      create: "Enregistrement créé !",
      read: "",
      update: "Enregistrement édité !",
      delete: "Suppression effectuée avec succès !",
      login: "Connexion réussie !",
      logout: "",
    },
    warning: {
      icon: "fa-exclamation-triangle",
      create: "",
      read: "",
      update: "",
      delete: "",
      login: "",
      logout: "",
    },
  };

  const [show, setShow] = useState(true);

  useEffect(() => {
    // const timer = setTimeout(() => {
    setShow(true);
    // }, 3000);
    // return () => clearTimeout(timer);
  }, [alert]);

  if (!show || alert === null) return null;

  return (
    <div
      className={`alert alert-${alert.type} flex align-items-center justify-content-center`}
      role="alert"
      style={{ paddingTop: "2px", paddingBottom: "2px"}}
    >
      <i
        className={`fa ${alerts[alert.type] && alerts[alert.type].icon} me-2`}
        aria-hidden="true"
      ></i>
      {alerts[alert.type] && alerts[alert.type][alert.action]}
      <button
        type="button"
        className="btn-close float-end"
        onClick={() => {
          setShow(false);
        }}
      ></button>
    </div>
  );
};
