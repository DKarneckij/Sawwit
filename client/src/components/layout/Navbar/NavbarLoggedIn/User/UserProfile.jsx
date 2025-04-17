import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faDharmachakra } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@contexts/authContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div
      className="
        flex items-center 
        rounded border border-transparent 
        hover:outline-2 hover:outline-border-hover 
        cursor-pointer select-none
      "
    >
      <div
        className="
          flex items-center justify-start 
          w-[212px] h-[43px] px-2 
          max-[1050px]:w-fit
        "
      >
        {/* Profile Picture */}
        <div className="w-[24px] h-[24px] mr-1">
          <img
            src={user.profilePicture}
            alt="profile"
            className="object-cover object-center rounded"
          />
        </div>

        {/* Username + Karma (hidden on large screens) */}
        <div className="flex flex-col place-self-start text-xs font-bold pt-1 pl-1 max-[1050px]:hidden">
          <span className="text-left pl-[2px]">{user.displayName}</span>
          <span className="text-karma mt-[1px] font-medium">
            <FontAwesomeIcon
              icon={faDharmachakra}
              className="text-[1em] text-sawwit-blue mr-[1px]"
            />
            {user.karma} karma
          </span>
        </div>

        {/* Angle Icon */}
        <FontAwesomeIcon
          icon={faAngleDown}
          className="text-search-color justify-self-end ml-auto max-[1050px]:ml-2"
        />
      </div>
    </div>
  );
};

export default UserProfile;
