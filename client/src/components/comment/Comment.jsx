import { formatDistanceToNow } from 'date-fns';
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2';

const Comment = ({comment}) => {  

  return (
    <div className="flex ">
       
      {/*Author pfp */}
      <a href={`/u/${comment.author.username}`} className="w-8 h-fit mr-1">
        <img
          src={comment.author.profilePicture}
          className="w-full h-full object-cover rounded-full"
        />
      </a>

      <div className="flex flex-col pl-1">

        {/*Meta Bar */}
        <div className="flex items-center">
          <span className='text-[14px] font-bold text-gray-600'>{comment.author.displayName}</span>
          <span className="text-[10px] mx-1">•</span>
          <span className='text-[13px]'>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
        </div>

        {/*Comment Body */}
        <span className='text-gray-800 py-[6px]'>
          {comment.content}
        </span>

        {/*Interaction */}
        <div className='flex items-center font-semibold text-[#9f9f9f] text-[13px] gap-2 left-[1px]'>

          {/*Karma */}
          <div className="flex items-center text-[25px]">
            <PiArrowFatUpLight className='h-[22px]'/>
            <span className='font-bold text-[14px] px-[2px]'>{ comment.karma }</span>
            <PiArrowFatDownLight className='h-[22px]' />
          </div>

          {/* Reply */}
          <button className="cursor-pointer">Reply</button>

          {/* Share */}
          <button className="cursor-pointer">Share</button>

          {/* Report */}
          <button className="cursor-pointer">Report</button>

        </div>
      </div>
    </div>
  )
}

export default Comment