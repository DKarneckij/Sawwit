import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { RiShareForwardFill } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const PostActions = () => {

  const actionBtnClass =
  'flex gap-1 items-center cursor-pointer text-gray-500 hover:bg-gray-100 rounded-full py-1';

  return (
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
  )
}

export default PostActions;