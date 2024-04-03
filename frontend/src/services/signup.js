import axios from "axios";
const baseUrl = 'http://localhost:3001/api/users'

const signup = async information => { 
  const response = await axios.post(baseUrl, information)
  return response.data
} 

export default {signup}