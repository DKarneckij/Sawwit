import { useState } from 'react'
import { useAuth } from '@contexts/authContext';
import clsx from 'clsx';
import commentService from '@services/commentService'
import { usePost } from '@contexts/postContext'

const CommentInput = ({ post }) => {

  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { refreshPost } = usePost();

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await commentService.create({
        content: comment.trim(),
        commentableType: "Post",
        commentableId: post.id,
      });
      setComment(''); // clear input
      refreshPost();
    } catch (err) {
      console.error('Failed to post comment:', err);
      // Optionally show error state
    }
  };

  return (
    <div>
        
    {/*Commenting User */}
    <span className='text-[13px] text-gray-800'>
      Comment as{' '}
      <span className='text-sawwit-blue'>{user.displayName}</span>
    </span>

    {/*Comment Box */}
    <div className=''>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What are your thoughts?"
        className="border-gray-300 w-full min-h-[90px] border-t border-l border-r rounded-t-md p-3 text-sm text-gray-800 leading-none focus:outline-none"
        style={{ marginBottom: '-2px' }} // force-collapse gap if needed
      />

      {/*Toolbar directly connected */}
      <div className="bg-gray-100 border-gray-300 flex w-full px-2 py-1 border-l border-r border-b rounded-b-md">
        <div className="w-full" />
        <button
          disabled={!comment.trim()}
          onClick={handleSubmit}
          className={clsx(
            'text-[12px] px-4 py-1 rounded-full transition-colors',
            comment.trim()
              ? 'bg-sawwit-blue text-white hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          )}
        >
          Comment
        </button>
      </div>
    </div>
  </div>
  )
}

export default CommentInput;