import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import PostContentRenderer from '@components/posts/PostContentRenderer';
import postService from '@services/postService';
import PostBanner from '@components/banner/PostBanner'
import Sidebar from '@components/sidebar/subsaw'
import TextPost from '@components/posts/TextPost'
import { PostProvider } from '@contexts/postContext';

const PostPage = () => {
  const { subsawName, postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(!post); // if we have post already, no need to load

  const fetchPost = useCallback(async () => {
    try {
      const data = await postService.getById(subsawName, postId);
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
    <PostProvider>
      <div className='flex flex-col'>
        
        {/* Top Banner */}
        <PostBanner />

        <div className="flex justify-center min-h-[calc(100vh-56px)] bg-main-background p-4">

          <TextPost post={post} />

          {/*Right Sidebar */}
          <Sidebar />
          
        </div>
      </div>
    </PostProvider>
  );
};

export default PostPage;
