import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const Login = () => {

  const [showLogin, setShowLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
    setEmail('');
  }

  return (   
    <React.Fragment>
        <button onClick={() => setOpenModal(true)} className='flex justify-center items-center flex-shrink-0 h-[40px] px-[1rem] whitespace-nowrap text-white font-bold bg-sawwit_blue rounded-full'>
            Log In
        </button>

        <Modal dismissible show={openModal} size="lg" onClose={onCloseModal} popup className='my-auto'>
        <Modal.Header />
        <Modal.Body>
          {showLogin ? <LoginModal setShowLogin={setShowLogin}/> : <SignUpModal setShowLogin={setShowLogin}/>}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default Login
