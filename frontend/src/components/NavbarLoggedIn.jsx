import React from 'react'
import HomeLogo from './HomeLogo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {faFireFlameCurved} from '@fortawesome/free-solid-svg-icons'
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faDharmachakra} from '@fortawesome/free-solid-svg-icons'

const NavbarLoggedIn = () => {

    return (
      <div className='text-primary_text'>
        <nav className=" h-12 px-3 flex items-center">
  
            {/* First Half */}
            <div className='
              inline-flex items-center grow min-w-fit'>

              <HomeLogo></HomeLogo>
  
              {/* Home Button */}
              <div className='pl-3 rounded border border-transparent hover:border-border_hover'>
                <button className='
                  w-[270px] h-[36px] flex items-center rounded 
                  sm:w-fit'>
                  <FontAwesomeIcon icon={faHouse} className='text-xl pr-2' />
                  <h1 className='font-bold flex-grow text-left sm:hidden'>Home</h1>
                  <FontAwesomeIcon icon={faAngleDown} className='text-md pr-3 text-primary_text ml-1'/></button>
              </div>
  
              {/* Search Bar */}
              <div className='
                flex items-center w-full
                ml-3 rounded-full border border-border_hover hover:border-border_focus'>
                <form action="" className='
                  flex items-center w-full
                  bg-search_background rounded-full h-[40px] px-4'>
                  <label htmlFor="" className=''>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-search_color text-xl pr-3'/></label>
                  <input type="text" placeholder='Search Sawwit' className='w-full bg-search_background focus:outline-none' /></form>
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
   
                {/* Profile */}
              <div className='
                flex items-center 
                rounded border border-transparent hover:border-border_hover '>
                <button className='
                  flex items-center justify-start 
                  w-[175px] h-[43px] px-2 
                  lg:w-fit'>
                  {/* Image */}
                  <div className='
                    relative 
                    w-[24px] h-[24px] mr-1' >
                    <img src="./assets/misc/profile_pic.PNG" alt="" className='object-cover object-center rounded'/>
                  </div> 
                  {/* Profile Information */}
                  <span className='
                    flex flex-col place-self-start
                    text-xs font-bold pt-1 pl-1 
                    lg:hidden'>
                      {/* Name */}
                      <span className='text-left pl-[2px]'>
                        Kirboo
                      </span>
                      {/* Karma */}
                      <span className='text-karma_color mt-[1px]'>
                        <FontAwesomeIcon icon={faDharmachakra} className='text-[1em] text-sawwit_blue mr-[1px]'></FontAwesomeIcon>
                        3.5k karma
                      </span>
                  </span>
                  <FontAwesomeIcon icon={faAngleDown} className='text-search_color justify-self-end ml-auto lg:ml-2'/>
                </button>
              </div>
  
            </div>
  
  
          
        </nav>
  
        <main className='bg-main_background  min-h-[calc(100vh-48px)]'>
          test
        </main>
  
      </div>
  )}
  
  export default NavbarLoggedIn
  