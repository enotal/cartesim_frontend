import axios from 'axios'

// export const API_BASE_URL = 'http://10.192.3.31:8000/api/'
export const API_BASE_URL = 'http://localhost:8000/api/'
// export const API_BASE_URL = 'http://192.168.11.195:8000/api/'

// login
export const login = async (resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL + 'login', resourceData)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// logout
export const logout = async (resource) => {
  try {
    const response = await axios.post(API_BASE_URL + 'logout/' + resource)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// List
export const getData = async (apiResource) => {
  try {
    const response = await axios.get(API_BASE_URL + apiResource)
    return response.data.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// Show
export const getItem = async (apiResource) => {
  try {
    const response = await axios.get(API_BASE_URL + apiResource)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// get by
export const getItemBy = async (apiResource, resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL + apiResource, resourceData)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error fetching user data:', error)
    // throw error // Re-throw to allow component-level error handling
  }
}

// Store
export const createItem = async (apiResource, resourceData) => {
  try {
    const response = await axios.post(API_BASE_URL + apiResource, resourceData)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error creating post:', error)
    // throw error
  }
}

// Update
export const updateItem = async (apiResource, resourceData) => {
  try {
    const response = await axios.patch(API_BASE_URL + apiResource, resourceData)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error updating post:', error)
    // throw error
  }
}

// Delete
export const deleteItem = async (apiResource) => {
  try {
    const response = await axios.delete(API_BASE_URL + apiResource)
    return response.data
  } catch (error) {
    return error.response
    // console.error('Error deleting post:', error)
    // throw error
  }
}
