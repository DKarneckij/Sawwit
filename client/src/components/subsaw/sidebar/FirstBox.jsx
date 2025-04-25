import React from 'react'
import { useNavigate } from "react-router-dom";

import FirstBoxBanner from './FirstBoxBanner'
import Disc from './Disc'
import DateCreated from './DateCreated'
import MembersCount from './MembersCount'

export default function FirstBox() {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`${window.location.pathname}/submit`);
  };

  return (
    <div className='
      w-[312px] px-3 pb-3 bg-white rounded
      border border-component-border'>
      
      <FirstBoxBanner />
      
      <Disc />
      
      <DateCreated />
      
      <hr className='my-3 text-border-hover'/>
      
      <MembersCount />

      <hr className='my-3 text-border-hover'/>

      {/*Create Post Button */}
      <div className='flex flex-col py-2'>
        <button onClick={handleClick} className="cursor-pointer inline-flex items-center justify-center h-[32px] bg-sawwit-secondary font-bold text-white text-center rounded-full hover:bg-sawwit-secondary-hover">Create Post</button>
      </div>

    </div>
  )
}
