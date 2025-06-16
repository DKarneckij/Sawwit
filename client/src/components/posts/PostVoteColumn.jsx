import { PiArrowFatUpBold, PiArrowFatDownBold } from "react-icons/pi";

const PostVoteColumn = ({ post }) => {
  return (
    <div className="flex flex-col items-center text-[25px] text-[#9f9f9f] mr-2">
      <PiArrowFatUpBold />
      <span className='text-gray-900 font-bold text-[14px]'>{ post.karma }</span>
      <PiArrowFatDownBold />
    </div>
  )
}

export default PostVoteColumn;