import { useState } from 'react'

import { formatDistanceToNow } from 'date-fns';
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { PiArrowFatUpBold } from "react-icons/pi";
import { PiArrowFatDownBold } from "react-icons/pi";
import { Link } from 'react-router-dom'

import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { RiShareForwardFill } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import { useAuth } from '@contexts/authContext'; // or your actual path


const TextPost = ({ post }) => {

  const [comment, setComment] = useState('');
  const { user } = useAuth();


  const actionBtnClass =
  'flex gap-1 items-center cursor-pointer text-gray-500 hover:bg-gray-100 rounded-full py-1';

  return ( 
  <main className="flex flex-col gap-4 text-search-text rounded max-w-[750px] w-full">

    {/*Content box */}
    <div className="flex bg-white shadow-md p-2">

      {/*Karma Column */}
      <div className="flex flex-col items-center text-[25px] text-[#C3C3D5] mr-2">
        <PiArrowFatUpBold />
        <span className='text-gray-900 font-bold text-[14px]'>{post.karma}</span>
        <PiArrowFatDownBold />
      </div>

      <div className="flex flex-col">
        {/*Post Details*/}
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

        {/*Title */}
        <h1 className='font-semibold text-[22px] text-gray-900'>
          {post.title}
        </h1>
        
        {/*Content */}
        <div className="mt-2 text-[16px] text-gray-800 whitespace-pre-line">
          {post.content}
        </div>

        {/*Post Actions */}
        <div className='flex items-center font-semibold text-[13px] gap-3 mt-2'>

          {/*Comments */}
          <div className={actionBtnClass}>
            <HiOutlineChatBubbleLeft className='text-[20px]' />
            22 Comments
          </div>
          
          {/*Share */}
          <div className={actionBtnClass}>
            <RiShareForwardFill className='text-[20px]'/>
            Share
          </div>

          {/*Save */}
          <div className={actionBtnClass}>
            <MdOutlineBookmarkBorder className='text-[20px]'/>
            Save
          </div>

          {/*Options */}
          <div className={actionBtnClass}>
            <BsThreeDots className='text-[20px]' />
          </div>
        </div>
      </div>
    </div>

    {/*Comments Box */}
    <div className='flex flex-col bg-white shadow-md p-2'>
      
      {/*Create Comment */}
      <div className='px-10'>
        
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
            className="border-gray-300 w-full min-h-[120px] border-t border-l border-r rounded-t-md p-3 text-sm text-gray-800 leading-none"
            style={{ marginBottom: '-2px' }} // 👈 force-collapse gap if needed
          />

          {/*Toolbar directly connected */}
          <div className="bg-gray-100 border-gray-300 flex w-full px-2 py-1 border-l border-r border-b rounded-b-md">
            <div className="w-full" />
            <div className="text-[12px] px-4 py-1 rounded-full bg-white cursor-pointer">
              Comment
            </div>
          </div>
        </div>
      

      </div>

    </div>
  </main>
  )
};
export default TextPost;
