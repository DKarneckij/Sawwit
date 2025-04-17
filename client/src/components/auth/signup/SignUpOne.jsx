import { Button, TextInput } from 'flowbite-react';

const SignUpOne = ({ email, setEmail, onNext, setShowLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    onNext();           // trigger step switch
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 px-6 py-4">
        <h1 className="text-[25px] font-bold text-center text-gray-900 dark:text-white">
          Sign Up
        </h1>

        <TextInput
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
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
          className="bg-sawwit-blue rounded-full w-[250px] font-bold"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SignUpOne;
