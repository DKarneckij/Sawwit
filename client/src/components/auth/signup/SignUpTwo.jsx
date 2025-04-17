import { Button, TextInput } from 'flowbite-react';

const SignUpTwo = ({
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  setShowLogin,
  formError, // ✅ receive from parent
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6 px-6 py-4">
        <h1 className="text-[22px] font-bold text-center text-gray-900 dark:text-white">
          Choose a username and password
        </h1>

        {/* ✅ Error message */}
        {formError && (
          <p className="text-sm text-red-500 text-center -mt-2">{formError}</p>
        )}

        <TextInput
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          type="submit"
          className="bg-sawwit-blue hover:bg-sawwit-blue-dark rounded-full w-[250px] font-bold"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpTwo;
