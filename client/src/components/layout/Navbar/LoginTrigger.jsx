import { useState } from 'react';
import LoginButton from './LoginButton';
import AuthModal from '@components/auth/AuthModal';

const LoginTrigger = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // true = login, false = signup

  return (
    <>
      <LoginButton onClick={() => setOpenModal(true)} />
      <AuthModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />
    </>
  );
};

export default LoginTrigger;
