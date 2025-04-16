import { Button, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SignUpTwo = ({
  username,
  setUsername,
  password,
  setPassword,
  onBack,
  onSubmit,
  setShowLogin,
}) => {
  return (
    <>
      <div className="space-y-6 px-6 py-4">
      <button
        onClick={onBack}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-700 dark:text-gray-300" />
      </button>

        <h1 className="text-[22px] font-bold text-center text-gray-900 dark:text-white">
          Choose a username and password
        </h1>

        <TextInput
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
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

        <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-300">
          Already a Sawwitor?
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Log In
          </button>
        </div>
      </div>

      <div className="flex justify-center pb-4">
        <Button
          onClick={onSubmit}
          className="bg-sawwit-blue hover:bg-sawwit-blue-dark rounded-full w-[250px] font-bold"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

export default SignUpTwo;
