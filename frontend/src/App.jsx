// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

function App() {

  return (

    <div>

      <nav className="flex h-12 px-5">
        
        <div className='inline-flex  bg-blue-200'>
          <a href="/" className='inline-flex w-fit bg-yellow-200'>
            <img src="./assets/logo/logo-graphic.svg" alt="logo graphic" className="py-2 pr-2"/>
            {/* <img src="./assets/logo/logo-name.svg" alt="logo name" className="h-auto py-3"/> */}
          </a>
          <div className=''>
            <button className=''>
              <FontAwesomeIcon icon={faHouse} />
              Home
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
        </div>


      </nav>


      <main className='bg-gray-300 min-h-[calc(100vh-48px)]'>
        test
      </main>

    </div>
)}

export default App
