import React from 'react'
import HomeLogo from '../navigation/HomeLogo';

import UserDropdown from '../navigation/UserDropdown'
import NavigationDropdown from '../navigation/NavigationDropdown'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {faFireFlameCurved} from '@fortawesome/free-solid-svg-icons'
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const NavbarLoggedIn = () => {

  return (
    <>
      <nav className=" h-12 px-3 flex items-center text-primary_text bg-white sticky top-0">
        
        {/* First Half */}
        <div className='inline-flex items-center grow min-w-fit gap-4'>

          <HomeLogo />

          <NavigationDropdown />

          {/* Search Bar */}
          <div className='
            flex items-center w-full
            rounded-full border border-border_hover hover:border-border_focus'>
            <form action="" className='
              flex items-center w-full
              bg-search_background rounded-full h-[40px] px-4'>
            
              <label htmlFor="" className=''>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-search_color text-lg pr-3'/></label>
              <input type="text" placeholder='Search Sawwit' className='w-full bg-search_background focus:outline-none' />
            </form>
          </div>

        </div>

        {/* Second Half */}
        <div className='inline-flex items-center grow-0 pl-4 gap-1.5 min-w-fit'>

          {/* Popular */}
          <div className='xs:hidden'>
            <a href="" className='w-[32px] h-[32px] hover:bg-border_hover flex justify-center items-center'>
              <FontAwesomeIcon icon={faFireFlameCurved} className='text-xl'></FontAwesomeIcon>
            </a>
          </div>

          {/* Profile Related */}
          <div>

            {/* Icons */}
            <div className='flex items-center gap-1.5'>
              <a href="" className='w-[32px] h-[32px] hover:bg-border_hover flex justify-center items-center'>
                <FontAwesomeIcon icon={faComment} className='text-xl'></FontAwesomeIcon></a>
              <button className='w-[32px] h-[32px] hover:bg-border_hover flex justify-center items-center'>
                <FontAwesomeIcon icon={faBell} className='text-xl'></FontAwesomeIcon></button>
              <button className='w-[32px] h-[32px] hover:bg-border_hover flex justify-center items-center'>
                <FontAwesomeIcon icon={faPlus} className='text-[1.35em]'></FontAwesomeIcon></button>
            </div>

          </div>

          <UserDropdown />

        </div>
      </nav>
    </>
  )}
  
  export default NavbarLoggedIn
  