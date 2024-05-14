import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faDharmachakra} from '@fortawesome/free-solid-svg-icons'

import userService from '../../services/userService'
import { useAuth } from '../../contexts/auth'

const UserProfile = () => {

  const {user} = useAuth()

  return (
    <div>
      <div className='
        flex items-center 
        rounded border border-transparent hover:border-border_hover'>
        
        {/* Profile Button*/}
        <div className='
          flex items-center justify-start 
          w-[212px] h-[43px] px-2 
          lg:w-fit'>

          {/* Image */}
          <div className='
            w-[24px] h-[24px] mr-1'>
            <img src={user.profilePicture} alt="" className='object-cover object-center rounded'/>
          </div>

          {/* Profile Information */}
          <span className='
            flex flex-col place-self-start
            text-xs font-bold pt-1 pl-1 
            lg:hidden'>
              {/* Name */}
              <span className='text-left pl-[2px]'>
                {user ? user.username : ""}
              </span>
              {/* Karma */}
              <span className='text-karma_color mt-[1px] font-medium'>
                <FontAwesomeIcon icon={faDharmachakra} className='text-[1em] text-sawwit_blue mr-[1px]'></FontAwesomeIcon>
                {user ? user.karma : ""} karma
              </span>
          </span>
          <FontAwesomeIcon icon={faAngleDown} className='text-search_color justify-self-end ml-auto lg:ml-2'/>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
