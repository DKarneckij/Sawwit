import axios from 'axios';

const API_BASE = '/api/s';

const create = async (name) => {
  try {
    const response = await axios.post(
      `${API_BASE}`,
      { subsawName: name },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
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
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      throw new Error('Community not found');
    } else {
      throw new Error('Failed to load community');
    }
  }
};

const join = async (subsawName) => {
  try {
    const res = await axios.post(`${API_BASE}/${subsawName}/join`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error('Failed to join community');
  }
};

const leave = async (subsawName) => {
  try {
    const res = await axios.post(`${API_BASE}/${subsawName}/leave`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error('Failed to leave community');
  }
};

const updateSubsaw = async (name, data) => {
  try {
    const response = await axios.patch(`/api/s/${name}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to update subsaw');
  }
};

export default {
  create,
  getByName,
  join,
  leave,
  updateSubsaw
};
