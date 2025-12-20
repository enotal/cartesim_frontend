import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import KeycloakService from '../../KeycloakService'
import { isAuthenticated } from '../../authService'

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [token, setToken] = useState(null)

  /*useEffect(() => {
    KeycloakService.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    })
      .then((authenticated) => {
        console.log('User is authenticated : ', authenticated)
        setIsAuthenticated(authenticated)
        if (authenticated) {
          const token = KeycloakService.getToken()
          setToken(token)
          console.log('Access token : ', token)
        }
      })
      .catch((err) => {
        console.error('Keycloak init error:', err)
      })
  }, [])

  console.log(isAuthenticated)
  if (isAuthenticated && token !== null) {
    localStorage.setItem('optiacademiqplus_auth', {
      isAuthenticated: isAuthenticated,
      token: token,
    })
  } else {
    //
  }*/

  return <>Dashboard</>
}

export default Dashboard
