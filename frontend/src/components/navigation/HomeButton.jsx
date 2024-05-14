import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

const HomeButton = () => {
  return (
   <div className='pl-3 rounded border border-transparent hover:border-border_hover'>
    <button className='
      w-[270px] h-[36px] flex items-center rounded 
      sm:w-fit'>
      <FontAwesomeIcon icon={faHouse} className='text-xl pr-2' />
      <h1 className='font-bold flex-grow text-left sm:hidden'>Home</h1>
      <FontAwesomeIcon icon={faAngleDown} className='text-md pr-3 text-primary_text ml-1'/></button></div>
  )
}

export default HomeButton
