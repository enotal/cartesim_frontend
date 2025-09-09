import React, { useEffect, useState } from 'react'
import KeycloakService from './KeycloakService'

export const isAuthenticated = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    KeycloakService.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    })
      .then((authenticated) => {
        if (!authenticated) {
          setToken(KeycloakService.getToken())
          console.log('Access token : ', token)
        }
      })
      .catch((err) => {
        console.error('Keycloak init error:', err)
      })
  }, [])

  // console.log(token)
  return true
}
