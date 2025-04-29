import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import postService from '@services/postService';

const PostPage = () => {
  const { subsawName, postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(!post); // if we have post already, no need to load

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getById(subsawName, postId);
        setPost(data);
      } catch (err) {
        console.error('Failed to load post:', err.message || err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [subsawName, postId]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-56px)] bg-main-background">
      <div className="bg-white p-6 rounded shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600">{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;
