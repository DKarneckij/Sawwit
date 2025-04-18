import { useAuth } from '@contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const CreatePostBar = () => {
  const { user } = useAuth();

  const handleCreateClick = () => {
    console.log("Creating Post Here Thing");
  };

  return (
    <div className="
      flex items-center p-2 mb-4
      bg-white
      rounded border border-component-border text-home
    ">
      {/* Profile Picture */}
      <a href="#" className="mr-2 shrink-0">
        <div className="w-[38px] h-[38px]">
          {user && (
            <img
              src={user.profilePicture}
              alt="profile"
              className="w-full h-full object-cover object-center rounded-full"
            />
          )}
        </div>
      </a>

      {/* Input Field */}
      <div
        onClick={handleCreateClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' ? handleCreateClick() : null)}
        className="
          grow h-[38px] mr-2 px-4 flex items-center
          rounded border border-border-hover
          bg-search-background
          hover:border-border-focus hover:bg-search-hover
          focus:outline-none cursor-pointer select-none
        "
      >
        Create Post
      </div>

      {/* Image Icon */}
      <a
        href="#"
        className="flex items-center justify-center w-10 h-10 hover:bg-border-hover rounded"
      >
        <FontAwesomeIcon icon={faImage} className="text-[1.25em]" />
      </a>

      {/* Link Icon */}
      <a
        href="#"
        className="flex items-center justify-center w-10 h-10 hover:bg-border-hover rounded"
      >
        <FontAwesomeIcon icon={faLink} className="text-[1.25em]" />
      </a>
    </div>
  );
};

export default CreatePostBar;
