import { useState, useEffect } from 'react';
import SignUpOne from './SignUpOne';
import SignUpTwo from './SignUpTwo';
import { signup } from '@services/authService'; // your new API wrapper
import { useAuth } from '@contexts/authContext'; // for login()

const SignUpForm = ({ setShowLogin, onClose, setGlobalOnBack }) => {
  const [stepOne, setStepOne] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { refreshUser } = useAuth();

  useEffect(() => {
  if (!setGlobalOnBack) return;

  if (stepOne) {
    setGlobalOnBack(null);
  } else {
    setGlobalOnBack(() => () => setStepOne(true));
  }
}, [stepOne, setGlobalOnBack]);

  const onSubmit = async (e) => {
    e.preventDefault(); // to support Enter key
    try {
      setFormError('');
      await signup({ email, username, password });
      await refreshUser();
      onClose();
    } catch (err) {
      setFormError(err.message);
    }
  };
  return stepOne ? (
    <SignUpOne
      email={email}
      setEmail={setEmail}
      onNext={() => {
        setFormError('');
        setStepOne(false);
      }}
      setShowLogin={setShowLogin}
    />
  ) : (
    <SignUpTwo
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      onBack={() => setStepOne(true)}
      setShowLogin={setShowLogin}
      formError={formError} // pass it down
    />
  );
};

export default SignUpForm;
