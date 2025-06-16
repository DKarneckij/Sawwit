import { useState } from 'react';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faFireFlameSimple,
  faCloud,
  faArrowUpShortWide,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

export default function SortDropdown({ onChange }) {
  const [selected, setSelected] = useState("Best");

  const handleSelect = (label) => {
    setSelected(label);
    if (onChange) onChange(label.toLowerCase());
  };

  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() => (
        <div className="flex items-center w-fit gap-1 py-1 mt-5 rounded-full hover:bg-border-hover cursor-pointer text-sawwit-secondary font-bold text-[14px] ">
          Sort By: {selected}
          <FontAwesomeIcon icon={faAngleDown} className="ml-1 text-[13px] mt-[1px]" />
        </div>
      )}
    >
      {/* Best */}
      <DropdownItem onClick={() => handleSelect("Best")}>
        <div className="flex items-center gap-2 text-[15px] text-home">
          <FontAwesomeIcon icon={faRocket} className="text-[16px] w-[15px]" />
          <span>Best</span>
        </div>
      </DropdownItem>

      {/* Hot */}
      <DropdownItem onClick={() => handleSelect("Hot")}>
        <div className="flex items-center gap-2 text-[15px] text-home">
          <FontAwesomeIcon icon={faFireFlameSimple} className="text-[17px] w-[15px]" />
          <span>Hot</span>
        </div>
      </DropdownItem>

      {/* Top */}
      <DropdownItem onClick={() => handleSelect("Top")}>
        <div className="flex items-center gap-2 text-[15px] text-home">
          <FontAwesomeIcon icon={faCloud} className="text-[14px] w-[15px]" />
          <span>Top</span>
        </div>
      </DropdownItem>

      {/* New */}
      <DropdownItem onClick={() => handleSelect("New")}>
        <div className="flex items-center gap-2 text-[15px] text-home">
          <FontAwesomeIcon icon={faArrowUpShortWide} className="text-[15px] w-[15px]" />
          <span>New</span>
        </div>
      </DropdownItem>
    </Dropdown>
  );
}
