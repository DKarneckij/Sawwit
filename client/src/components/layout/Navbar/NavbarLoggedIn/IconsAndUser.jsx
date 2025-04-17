
import IconButton from './IconButton';
import UserDropdown from './User/UserDropdown';

import {
  faFireFlameCurved,
  faComment,
  faBell,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const IconsAndUser = () => {
  return (
    <div className="inline-flex items-center grow-0 min-w-fit">
      <div className="max-[600px]:hidden">
        <IconButton icon={faFireFlameCurved} href="/" />
      </div>

      <div className="flex items-center">
        <IconButton icon={faComment} href="/" />
        <IconButton icon={faBell} />
        <IconButton icon={faPlus} size="text-[1.35em]" />
      </div>

      <UserDropdown />
    </div>
  );
};

export default IconsAndUser;
