import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleUp} from '@fortawesome/free-regular-svg-icons'
import {faCircleDown} from '@fortawesome/free-regular-svg-icons'

const JoinCommBack = () => {
  return (
    <div className='flex w-full -mb-[1px] bg-nocommunities border border-[#d3d3d3] text-[#ccc]'>
      {/*Karma */}
      <div className='flex flex-col justify-center items-center w-10 [@media(max-width:640px)]:hidden'>
        <span className='flex items-center justify-center w-6 h-6'>
          <FontAwesomeIcon icon={faCircleUp} className=''></FontAwesomeIcon>
        </span>
        <div className='h-4'></div>
        <span className='flex items-center justify-center w-6 h-6'>
            <FontAwesomeIcon icon={faCircleDown} className=''></FontAwesomeIcon>
        </span>
      </div>
    {/*Right To Karma */}
    <div className='flex my-[8px] h-[72px]'></div>
    </div>
  )
}

export default JoinCommBack
