import { useNavigate } from 'react-router-dom';

const SubsawNotFoundPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1650&q=80')`,
        minHeight: 'calc(100vh - 56px)'
      }}
    >
      <div className="relative w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        {/* Close Button */}
        <button
          onClick={handleRedirect}
          className="cursor-pointer absolute w-[26px] h-[26px] top-2 right-4 rounded-full text-gray-500 hover:bg-border-hover"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          Community Not Found
        </h2>
        <p className="text-center text-gray-600 mb-6">
          The community you’re looking for doesn’t exist or has been removed.
        </p>

        <button
          onClick={handleRedirect}
          className="cursor-pointer w-full bg-sawwit-secondary text-white font-semibold py-2 px-4 rounded-full hover:bg-sawwit-secondary-hover transition"
        >
          Browse Other Communities
        </button>
      </div>
    </div>
  );
};

export default SubsawNotFoundPage;
