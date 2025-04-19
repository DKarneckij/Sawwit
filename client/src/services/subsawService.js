import axios from 'axios';

const API_BASE = '/api/s';

const create = async (name) => {
  try {
    const response = await axios.post(
      `${API_BASE}`,
      { subsawName: name },
      { withCredentials: true } // send cookies for auth
    );
    return response.data;
  } catch(err) {
    if (err?.response?.status === 409) {
      throw new Error('That community name is already taken');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

const getByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE}/${name}`, {
      withCredentials: true
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      throw new Error('Community not found');
    } else {
      throw new Error('Failed to load community');
    }
  }
};

export default {
  create,
  getByName
}
