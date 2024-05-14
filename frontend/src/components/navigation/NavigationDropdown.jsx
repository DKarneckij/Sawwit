import { Dropdown } from "flowbite-react";

import HomeButton from './HomeButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import {faFireFlameCurved} from '@fortawesome/free-solid-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faCircleUp} from '@fortawesome/free-solid-svg-icons'




import {useAuth} from '../../contexts/auth'



const UserDropdown = () => {

  const {logout} = useAuth()

  return (
    <>
      <Dropdown label="" 
        dismissOnClick={false} 
        renderTrigger={ () => <div> < HomeButton /> </div> }
        className="w-100 font-semibold">
        
        <Dropdown.Header className="flex items-center text-profile_dropdown_gray">
          <span className="text-md block">Your Communities</span>
        </Dropdown.Header>

          <Dropdown.Item>
            <div className="pl-[22px]">Profile</div>
          </Dropdown.Item>

        <Dropdown.Header className="flex items-center text-profile_dropdown_gray">
          <span className="text-md block">Feeds</span>
        </Dropdown.Header>

          <Dropdown.Item>
              <FontAwesomeIcon icon={faHouse} className='text-md pr-2 ml-1'/>
              <div >Home</div>
            </Dropdown.Item>
          <Dropdown.Item>
              <FontAwesomeIcon icon={faFireFlameCurved} className='text-[18px] pr-2 ml-1'/>
              <div >Popular</div>
            </Dropdown.Item>
          <Dropdown.Item>
              <FontAwesomeIcon icon={faCircleUp} className='text-md pr-2 ml-1'/>
              <div >All</div>
            </Dropdown.Item>  

      </Dropdown>
    </>
  );
}

export default UserDropdown