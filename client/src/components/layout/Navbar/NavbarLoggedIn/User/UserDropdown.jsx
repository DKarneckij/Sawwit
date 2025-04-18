import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faUser,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import UserProfile from './UserProfile';
import { useAuth } from '@contexts/authContext';

const UserDropdown = () => {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  if (!user) return null;

  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => <div><UserProfile /></div>}
      className="w-[280px] font-semibold"
    >
      {/* My Profile Section */}
      <DropdownHeader className="flex items-center text-profile-dropdown-gray">
        <FontAwesomeIcon icon={faUser} className="text-md pr-2 ml-1" />
        <span className="text-md block">My Profile</span>
      </DropdownHeader>
      <DropdownItem>
        <div className="pl-[22px]">Profile</div>
      </DropdownItem>
      <DropdownItem>
        <div className="pl-[22px]">User Settings</div>
      </DropdownItem>

      {/* View Options Section */}
      <DropdownHeader className="flex items-center text-profile-dropdown-gray">
        <FontAwesomeIcon icon={faEye} className="text-md pr-1 ml-1" />
        <span className="text-md block">View Options</span>
      </DropdownHeader>
      <DropdownItem>
        <div className="pl-[22px]">Dark Mode</div>
      </DropdownItem>

      <DropdownDivider />

      {/* Logout */}
      <DropdownItem onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="text-md pr-2 text-primary_text ml-1"
        />
        Log Out
      </DropdownItem>
    </Dropdown>
  );
};

export default UserDropdown;
