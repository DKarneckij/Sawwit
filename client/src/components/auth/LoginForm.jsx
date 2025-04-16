import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';

const LoginForm = ({ setShowLogin, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Attempting login with:', { identifier, password });
    // Placeholder: simulate login success
    onClose();
  };

  return (
    <>
      <div className="space-y-6 px-6 py-4">
        <h1 className="text-center text-[25px] font-bold text-gray-900 dark:text-white">
          Log In
        </h1>

        <TextInput
          id="identifier"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type="text"
          required
        />

        <TextInput
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <div className="flex justify-between">
          <a
            href="#"
            className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Forgot Password?
          </a>
        </div>

        <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-300">
          New to Sawwit?
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="flex justify-center pb-4">
        <Button
          onClick={handleLogin}
          className="bg-sawwit-blue hover:bg-sawwit-blue-dark rounded-full w-[250px] font-bold">
          Log In
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
