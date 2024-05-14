import axios from "axios";
import {useAuth} from "../contexts/auth"

let token = null

const setToken = newToken => {  
  token = `Bearer ${newToken}`
}

// Uses credentials to return a User 
export const login = async credentials => {
  const response = await axios.post('http://localhost:3001/api/login', credentials)
  return response.data
}

export const signup = async information => { 
  const response = await axios.post('http://localhost:3001/api/users', information)
  return response.data
}

export const getLoggedUser = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get('http://localhost:3001/api/me/', config)
  return response.data
}

const userService = {
  login,
  signup,
  getLoggedUser,
  setToken
}

export default userService;