// eslint-disable-next-line no-unused-vars
import React from 'react'
import SearchBar from '../navigation/SearchBar';
import HomeLogo from '../navigation/HomeLogo';
import Login from '../navigation/Login';

const NavbarLoggedOut = () => {

  return (
    <>
      <nav className="h-12 px-3 flex items-center text-primary_text sticky top-0">
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

    </>
)}

export default NavbarLoggedOut
