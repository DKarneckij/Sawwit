import { useState, useEffect } from 'react';
import ModalWrapper from '@components/modals/ModalWrapper';
import LoginForm from '@auth/LoginForm';
import SignUpForm from '@auth/signup/SignUpForm';

const AuthModal = ({ isOpen, onClose, showLogin, setShowLogin }) => {
  const [onBack, setOnBack] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setShowLogin(true);  // Reset to login mode
      setOnBack(null);     // Clear back button state
    }
  }, [isOpen]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
    >
      {showLogin ? (
        <LoginForm setShowLogin={setShowLogin} onClose={onClose} />
      ) : (
        <SignUpForm
          setShowLogin={setShowLogin}
          onClose={onClose}
          setGlobalOnBack={setOnBack}
        />
      )}
    </ModalWrapper>
  );
};

export default AuthModal;
