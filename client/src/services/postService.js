import axios from 'axios';

const API_BASE = '/api/s';

const create = async ({ title, content, type, subsawName }) => {
  try {
    const response = await axios.post(
      `${API_BASE}/${subsawName}/posts`,
      { title, content, type },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    if (err?.response?.data?.error) {
      throw new Error(err.response.data.error);
    } else {
      throw new Error('Failed to create post. Please try again.');
    }
  }
};

const getById = async (subsawName, postId) => {
  try {
    const response = await axios.get(`${API_BASE}/${subsawName}/posts/${postId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      throw new Error('Post not found.');
    } else {
      throw new Error('Failed to load post.');
    }
  }
};

export default {
  create,
  getById,
};
