import axios from 'axios';

export async function signup({ email, username, password }) {
  try {
    const res = await axios.post('/api/auth/signup', {
      email,
      username,
      password,
    }, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error('Signup failed. Please try again.');
  }
}

export async function login({ identifier, password }) {
  try {
    const res = await axios.post('/api/auth/login', {
      identifier,
      password,
    }, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error('Login failed. Please try again.');
  }
}
