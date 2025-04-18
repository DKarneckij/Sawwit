import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faFireFlameSimple,
  faCloud,
  faArrowUpShortWide,
  faAngleDown,
  faTable,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';

const sortOptions = [
  { label: 'Best', icon: faRocket },
  { label: 'Hot', icon: faFireFlameSimple },
  { label: 'Top', icon: faCloud },
  { label: 'New', icon: faArrowUpShortWide },
];

const PostsToolbar = () => {
  return (
    <div className="
      flex justify-between items-center w-full px-3 py-2 mb-4 h-[60px]
      bg-white text-home
      rounded border border-component-border
    ">
      {/* Sort Options */}
      <div className="flex items-center gap-2">
        {sortOptions.map(({ label, icon }) => (
          <a
            key={label}
            href="#"
            className="
              flex items-center py-1 px-2 rounded-full hover:bg-border-hover
              font-bold text-[16px]
            "
          >
            <FontAwesomeIcon icon={icon} className="text-[17px] pr-2" />
            {label}
          </a>
        ))}
      </div>

      {/* View Options Dropdown */}
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="
            flex items-center gap-1 px-3 h-[32px]
            rounded-full hover:bg-border-hover cursor-pointer
          ">
            <FontAwesomeIcon icon={faTable} className="text-[17px]" />
            <FontAwesomeIcon icon={faAngleDown} className="text-[15px] mt-[2px]" />
          </div>
        )}
        className="text-home font-semibold"
      >
        <DropdownItem>
          <div className="flex items-center gap-2 text-[16px] text-home">
            <FontAwesomeIcon icon={faTable} />
            Card
          </div>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem>
          <div className="flex items-center gap-2 text-[16px] text-home">
            <FontAwesomeIcon icon={faGripLines} />
            Classic
          </div>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default PostsToolbar;
