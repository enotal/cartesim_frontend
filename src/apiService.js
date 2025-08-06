import react, { useState } from 'react'
import axios from 'axios'
import KeycloakService from './KeycloakService'

const baseUrl = 'http://127.0.0.1:8000/api/'
const timeout = 5000

// Login
//export const FetchLogin = async ({ apiResource, credentials }) => {}

// Get
export const FetchGet = async ({ apiResource }) => {
  try {
    const response = await axios.get(`${baseUrl + apiResource}`)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

// Create
export const FetchCreate = async (apiResource, credentials) => {
  /*try{
    const response = await axios.create(`${baseUrl + apiResource}`, 
        headers:{
            'Content-Type': 'application/json',
        }).then(response => {
            // Handle successful response
            console.log(response.data); // Access the fetched data
        }).catch(error => {
            // Handle errors
            console.error(error)
        }),*/
}

// Intercepteur qui ajoute le token d'authentification à chaque requête
api.interceptors.request.use(
  async (config) => {
    await KeycloakService.updateToken(30).catch(() => {
      KeycloakService.login()
    })

    const token = KeycloakService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.debug('[DEBUG] Token envoyé : ', token)
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api
