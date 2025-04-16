import { useState } from 'react';
import SignUpOne from '@auth/signup/SignUpOne';
import SignUpTwo from '@auth/signup/SignUpTwo';

const SignUpForm = ({ setShowLogin, onClose }) => {
  const [stepOne, setStepOne] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {stepOne ? (
        <SignUpOne
          email={email}
          setEmail={setEmail}
          onNext={() => setStepOne(false)}
          setShowLogin={setShowLogin}
        />
      ) : (
        <SignUpTwo
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onBack={() => setStepOne(true)}
          onSubmit={() => {
            console.log({ email, username, password }); // placeholder signup
            onClose();
          }}
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
};

export default SignUpForm;
