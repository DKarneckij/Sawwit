import ModalWrapper from '@auth/modal/ModalWrapper';
import LoginForm from '@auth/LoginForm';
import SignUpForm from '@components/auth/signup/SignUpForm';

const AuthModal = ({isOpen, onClose, showLogin, setShowLogin}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {showLogin ? (
        <LoginForm setShowLogin={setShowLogin} onClose={onClose} />
      ) : (
        <SignUpForm setShowLogin={setShowLogin} onClose={onClose} />
      )}
    </ModalWrapper>
  );
};

export default AuthModal;