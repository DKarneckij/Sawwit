import PostVoteColumn from '../PostVoteColumn';
import PostMetaBar from '../PostMetaBar';
import PostActions from '../PostActions';

import CommentInput from '@components/comment/CommentInput';
import SortDropdown from '@components/comment/SortDropdown';
import CommentList from '@components/comment/CommentList';

const TextPost = ({ post }) => {

  return ( 
  <main className="flex flex-col gap-4 text-search-text rounded max-w-[750px] w-full">

    {/*Content box */}
    <div className="flex bg-white shadow-md p-2">

      <PostVoteColumn post={post} />

      <div className="flex flex-col">
        
        <PostMetaBar post={post} />

        {/*Title */}
        <h1 className='font-semibold text-[22px] text-gray-900'>
          {post.title}
        </h1>
        
        {/*Content */}
        <div className="mt-2 text-[16px] text-gray-800 whitespace-pre-line">
          {post.content}
        </div>

        <PostActions />
    
      </div>
    </div>

    {/*Comments Box */}
    <div className='flex flex-col bg-white shadow-md p-2'>
      
      <div className='px-10 mb-4'>
        <CommentInput post={post} />
        {/*Sort options */}
        <SortDropdown onChange={(value) => console.log("Selected:", value)} />
      </div>

      <CommentList comments={post.comments}/>

    </div>
  </main>
  )
};
export default TextPost;
