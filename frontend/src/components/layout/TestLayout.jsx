import React, { useEffect } from 'react'
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

const TestLayout = () => {

  const {user} = useAuth();

  useEffect(() => {
    console.log("C")
  }, []);

  return (
    <>
      {!!user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
      <main className='flex bg-main_background min-h-[calc(100vh-48px)] py-5 px-6 [@media(max-width:640px)]:p-0'></main>
    </>
  )
}

export default TestLayout