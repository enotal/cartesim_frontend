import React from 'react'

export const isAuthenticated = () => {
  if (localStorage.getItem('optiacademiqplus_auth')) {
    const hg_auth = JSON.parse(localStorage.getItem('optiacademiqplus_auth'))
    const isLoggedIn = hg_auth.isAuthenticated
    return !!isLoggedIn // Returns true if a token exists, false otherwise
  } else {
    return false
  }
}
