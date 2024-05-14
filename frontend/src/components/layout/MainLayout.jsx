import React from 'react'
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import NavbarLoggedIn from './NavbarLoggedIn';
import NavbarLoggedOut from './NavbarLoggedOut';
import {useAuth} from '../../contexts/auth';
import NoCommBack from './NoCommBack';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import {faRocket} from '@fortawesome/free-solid-svg-icons'
import {faFireFlameSimple} from '@fortawesome/free-solid-svg-icons'
import {faCloud} from '@fortawesome/free-solid-svg-icons'
import {faArrowUpShortWide} from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import {faTable} from '@fortawesome/free-solid-svg-icons'
import {faGripLines} from '@fortawesome/free-solid-svg-icons'

const MainLayout = () => {

  const {user} = useAuth();

  const handleCreateClick = () => {
    console.log("Creating Post Here Thing");
  }
  
  return (
    <>
      {!!user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}

      <main className='flex bg-main_background min-h-[calc(100vh-48px)] py-5 px-6
        [@media(max-width:640px)]:p-0'>
            
        <div className=' grow flex justify-center box-border'>
          
            {/*Left */}
          <div className='grow shrink  max-w-[640px] min-w-0 '>
            
            {/*1st */}
            <div 
              className='
              flex items-center box-content p-2 mb-4
            bg-white text-[#9fa1a3] rounded
              border border-[#d2d2d2]'>

              {/*Profile Icon */}
              <a href="" className='mr-2'>
                <div className='
                  w-[38px] h-[38px]'>
                  <img src={user.profilePicture} alt="" className='object-cover object-center rounded-full'/>
                </div>
              </a>

              {/*Input Field */}
              <input 
                type="text" 
                placeholder='Create Post'
                onClick={handleCreateClick}
                className='grow rounded px-4 mr-2 h-[38px] border border-[#EDEFF1] bg-[#f6f7f8] hover:border-[#47b0db]'/>

              {/*Create Media */}
              <a href='' className='flex items-center justify-center w-10 h-10 hover:bg-[#edeff1] rounded'>
                <FontAwesomeIcon icon={faImage} className='text-[1.25em] '></FontAwesomeIcon>
              </a >

              {/*Link */}
              <a href='' className='flex items-center justify-center w-10 h-10 hover:bg-[#edeff1] p-1 rounded'>
                <FontAwesomeIcon icon={faLink} className='text-[1.25em] '></FontAwesomeIcon>
              </a>
            </div>

            {/*2nd */}
            <div className='
            flex justify-start items-center w-full px-[12px] py-[10px] mb-4 h-[60px]
            bg-white text-[#9fa1a3]
            rounded border border-[#d2d2d2]'>

              {/*Buttons */}
              <div className='flex items-center cursor-pointer'>
                <a href="" className='flex items-center mr-2 py-[4px] rounded-[20px] hover:bg-[#edeff1]'>
                  <span className='pr-[8px] text-[16px] font-bold'>
                    <FontAwesomeIcon icon={faRocket} className='px-2 text-[17px]'></FontAwesomeIcon>
                    Best</span></a>
                <a href="" className='flex items-center mr-2 py-[4px] rounded-[20px] hover:bg-[#edeff1]'>
                  <span className='pr-[8px] text-[16px] font-bold '>
                    <FontAwesomeIcon icon={faFireFlameSimple} className='px-2 text-[17px]'></FontAwesomeIcon>
                    Hot</span></a>
                <a href="" className='flex items-center mr-2 py-[4px] rounded-[20px] hover:bg-[#edeff1]'>
                  <span className='pr-[8px] text-[16px] font-bold'>
                    <FontAwesomeIcon icon={faCloud} className='px-2 text-[17px]'></FontAwesomeIcon>
                    Top</span></a>
                <a href="" className='flex items-center mr-2 py-[4px] rounded-[20px] hover:bg-[#edeff1]'>
                  <span className='pr-[8px] text-[16px] font-bold'>
                    <FontAwesomeIcon icon={faArrowUpShortWide} className='px-2 text-[17px] '></FontAwesomeIcon>
                    New</span></a>
              </div>

              {/*Space*/}
              <div className='grow'></div>

              {/*Views */}
              <div className=''>
              <Dropdown 
                label="" 
                dismissOnClick={false}
                renderTrigger={ () => 
                  <div className='flex items-center gap-1 px-2 h-[32px] rounded-[20px] hover:bg-[#edeff1]'>
                    <FontAwesomeIcon icon={faTable} className='text-[17px] '></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faAngleDown} className='text-[15px] '></FontAwesomeIcon>
                  </div> }
                className="text-[#9fa1a3] font-semibold">
                  <DropdownItem className=''>
                    <div className='flex justify-start gap-1 items-center text-[#9fa1a3] text-[16px]'>
                      <FontAwesomeIcon icon={faTable} className=''></FontAwesomeIcon>
                      Card
                    </div>
                  </DropdownItem>
                  <DropdownDivider/>
                  <DropdownItem className=''>
                    <div className='flex justify-start gap-1 items-center text-[#9fa1a3] text-[16px]'>
                      <FontAwesomeIcon icon={faGripLines} className=''></FontAwesomeIcon>
                      Classic
                    </div>
                  </DropdownItem>
              </Dropdown>
              </div>
            </div>
            
            {/*3rd */}
            <div className='relative'>
              <div>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
                <NoCommBack/>
              </div>
              <div className='absolute left-0 top-0 w-full h-full flex flex-col justify-start items-center'>
                <div className='flex flex-col items-center justify-center my-20 w-[80%]'>
                  <img src="https://res.cloudinary.com/dperxfai0/image/upload/v1715459159/assets/telescope.png" alt="" className='h-[150px]'/>
                  <p className='text-[18px] mx-4 mt-3 font-semibold text-center'>Sawwit gets better when you join communities, so find some that you'll love!</p>
                  <a href="" className='px-7 py-[5px] my-4 rounded-full text-white bg-[#ff4500] font-semibold' >Browse Popular Posts</a>
                </div>
              </div>
            </div>

          </div>

          {/*Right */}
          <div className='w-[312px] ml-6
            [@media(max-width:960px)]:hidden'>

            {/*Home Box */}
            <div className='
              w-[312px] px-3 py-[10px] bg-white rounded
              border border-[#d2d2d2]'>
              
              {/*Top Banner */}
              <div className='h-[34px] mx-[-12px] my-[-10px] rounded-t bg-[url(https://res.cloudinary.com/dperxfai0/image/upload/v1715459157/assets/home-banner.png)] bg-cover'></div>
            
              {/*Top Section */}
              <div className='text-[16px] mt-5 mb-2 ml-2 font-semibold leading-5'>
                Home
              </div>
              
              {/*Description */}
              <div className='text-[15px] mb-[14px]'>
                <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
              </div>

              <hr />

              {/*Buttons */}
              <div className='flex flex-col'>
                <a href="" className="inline-flex items-center justify-center h-[30px] mt-3 bg-[#ff4500] font-semibold text-white text-center rounded-full hover:bg-[#ff6227]">Create Post</a>
                <a href="" className='inline-flex items-center justify-center h-[30px] mt-3 border border-[#ff4500] text-[#ff4500] font-semibold text-center rounded-full hover:bg-[#f5f5f5]'>Create Community</a>
              </div>
            </div>
            
            {/*Terms of Service */}
            <div className='
              p-2 my-4 bg-white rounded text-[12px]
              border border-[#d2d2d2]'>
              {/*Top Section */}
              <div className='flex'>

                <div className='flex flex-col px-1 w-1/2 gap-2'>
                  <p className='cursor-pointer'>User Agreement</p>
                  <p className='cursor-pointer'>Privacy Policy</p>
                </div>

                <div className='flex flex-col px-1 w-1/2 gap-[6px]'>
                  <p className='cursor-pointer'>Content Policy</p>
                  <p className='cursor-pointer'>Moderator Code of Conduct</p>
                </div>
              </div>

              <hr className='my-[6px]' />

              {/*Bottom Section */}
              <div className=''>
                <p>Sawwit, Inc. © 2024. All Rights Reserved </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MainLayout