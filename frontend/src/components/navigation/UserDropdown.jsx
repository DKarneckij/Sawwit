import { Dropdown } from "flowbite-react";

import UserProfile from './UserProfile'
import {useAuth} from '../../contexts/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';




const UserDropdown = () => {

  const {logout} = useAuth()

  return (
    <>
      <Dropdown label="" 
        dismissOnClick={false} 
        renderTrigger={ () => <div> < UserProfile /> </div> }
        className="w-100 font-semibold">
        
        <Dropdown.Header className="flex items-center text-profile_dropdown_gray">
          <FontAwesomeIcon icon={faUser} className='text-md pr-2 ml-1'/>
          <span className="text-md block">My Profile</span>
        </Dropdown.Header>
        
          <Dropdown.Item>
            <div className="pl-[22px]">Profile</div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="pl-[22px]">User Settings</div>
          </Dropdown.Item>

        <Dropdown.Header className="flex items-center text-profile_dropdown_gray">
          <FontAwesomeIcon icon={faEye} className='text-md pr-1 ml-1'/>
          <span className="text-md block">View Options</span>
        </Dropdown.Header>

          <Dropdown.Item>
              <div className="pl-[22px]">Dark Mode</div>
            </Dropdown.Item>

        <Dropdown.Divider />

          <Dropdown.Item>
            <button onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket} className='text-md pr-1 text-primary_text ml-1'/>
              Log Out
            </button>
          </Dropdown.Item>
      </Dropdown>
    </>
  );
}

export default UserDropdown