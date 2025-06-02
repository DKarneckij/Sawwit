import axios from 'axios';

const API_BASE = '/api/s';

const create = async (subsawName) => {
  try {
    const response = await axios.post(
      `${API_BASE}`,
      { subsawName: subsawName },
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

const getByName = async (subsawName) => {
  try {
    const response = await axios.get(`${API_BASE}/${subsawName}`, {
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
  } catch {
    throw new Error('Failed to join community');
  }
};

const leave = async (subsawName) => {
  try {
    const res = await axios.post(`${API_BASE}/${subsawName}/leave`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    throw new Error('Failed to leave community');
  }
};

const updateSubsaw = async (subsawName, data) => {
  try {
    const response = await axios.patch(`/api/s/${subsawName}`, data, {
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
