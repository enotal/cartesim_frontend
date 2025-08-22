import React from 'react'

export const isAuthenticated = () => {
  // localStorage.removeItem('optiacademiqplus_auth');
  if (localStorage.getItem('optiacademiqplus_auth')) {
    const hg_auth = localStorage.getItem('optiacademiqplus_auth')
    const isLoggedIn = hg_auth.isAuthenticated
    return !!isLoggedIn // Returns true if a token exists, false otherwise
  } else {
    localStorage.removeItem('optiacademiqplus_auth')
    return false
  }
}
