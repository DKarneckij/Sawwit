import axios from 'axios';

const API_BASE = '/api';

const create = async ({content, commentableType, commentableId}) => {
  try { 
    const response = await axios.post(
      `${API_BASE}/comments`,
      { content, commentableType, commentableId },
      { withCredentials: true }
    );
    return response.body
  } catch (err) {
    if (err?.response?.data?.error) {
      throw new Error(err.response.data.error);
    } else {
      throw new Error('Failed to create comment. Please try again.');
    }
  }
}

export default {
  create
}