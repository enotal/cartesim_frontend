import Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: 'https://login.campusfaso.bf/auth',
  realm: 'campusFaso',
  clientId: 'optiacademiqplus',
}

const keycloak = new Keycloak(keycloakConfig)

let initPromise = null

export const KeycloakService = {
  instance: keycloak,

  init: (options = {}) => {
    if (!initPromise) {
      initPromise = keycloak
        .init({
          onLoad: 'check-sso', // Ne force pas la redirection
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          pkceMethod: 'S256',
          ...options
        })
        .then((authenticated) => {
          console.log('Keycloak authentication status:', authenticated)
          return authenticated
        })
        .catch((error) => {
          console.error('Keycloak init error:', error)
          initPromise = null
          throw error
        })
    }
    return initPromise
  },

  login: (options) => keycloak.login(options),
  logout: (options) => keycloak.logout(options),
  isAuthenticated: () => keycloak.authenticated,
  getToken: () => keycloak.token,
  getTokenParsed: () => keycloak.tokenParsed,
  hasRole: (role) => keycloak.hasRealmRole(role),
  updateToken: (minValidity = 30) => keycloak.updateToken(minValidity),
}

export default KeycloakService
