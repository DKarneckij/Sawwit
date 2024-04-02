// eslint-disable-next-line no-unused-vars
import React from 'react'
import SearchBar from './SearchBar';
import HomeLogo from './HomeLogo';
import Login from './Login';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {faFireFlameCurved} from '@fortawesome/free-solid-svg-icons'
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faDharmachakra} from '@fortawesome/free-solid-svg-icons'

const NavbarLoggedOut = () => {

  return (
    <div className='text-primary_text'>

      <nav className="h-12 px-3 flex items-center">
        <div className='inline-flex items-center grow'>

          <HomeLogo />

          <div className="w-full max-w-[750px] mx-auto">
            <SearchBar />
          </div>
          
          <Login />
          
        </div>
      </nav>

      <main className='bg-main_background  min-h-[calc(100vh-48px)]'>
        test
      </main>

    </div>
)}

export default NavbarLoggedOut
