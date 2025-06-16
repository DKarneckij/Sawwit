import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom'

const PostMetaBar = ({post}) => {
  return (
    <div className="flex items-center text-[13px] font-medium">

      {/*Subsaw */}
      <a href={`/s/${post.subsaw.subsawName}`} className="w-6 mr-1">
        <img
          src={post.subsaw.iconUrl}
          alt={`Icon for r/${post.subsaw.displayName}`}
          className="w-full h-full object-cover rounded-full"
        />
      </a>
      <Link to={`/s/${post.subsaw.subsawName}`} className="text-gray-900 font-semibold mr-1">
        {`r/${post.subsaw.displayName}`}
      </Link>

      <span className="text-[10px] mr-1">•</span>
      
      {/*Posting User */}
      <span className='mr-1'>
        Posted by <Link to={`/user/${post.author.displayName}`}>
          {`u/${post.author.displayName}`}
        </Link>
      </span>

      <span className="text-[10px] mr-1">•</span>

      {/*Time Posted */}
      <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>

    </div>
  )
}

export default PostMetaBar;