import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import postService from '@services/postService';

const postContext = createContext(null);

export const PostProvider = ({ children }) => {
  const { subsawName, postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      const data = await postService.getById(subsawName, postId);
      console.log(data);
      
      setPost(data);
    } catch (err) {
      console.error('Failed to load post:', err.message || err);
    } finally {
      setLoading(false);
    }
  }, [subsawName, postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <postContext.Provider value={{ post, refreshPost: fetchPost }}>
      {children}
    </postContext.Provider>
  );
};

export const usePost = () => useContext(postContext)