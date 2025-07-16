import React from 'react'

export const isAuthenticated = () => {
  if (localStorage.getItem("hg_auth")) {
    const hg_auth = JSON.parse(localStorage.getItem("hg_auth"));
    const token = hg_auth.tokenValue;
    return !!token; // Returns true if a token exists, false otherwise
  } else {
    return false;
  }
};
