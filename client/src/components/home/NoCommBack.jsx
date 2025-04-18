import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faCircleDown } from '@fortawesome/free-regular-svg-icons';

const NoCommBack = () => {
  return (
    <div className="flex w-full -mb-px bg-nocommunities border border-nocommunities-border text-[#ccc]">
      {/* Karma column */}
      <div className="flex flex-col items-center justify-center w-10 max-sm:hidden">
        <span className="flex items-center justify-center w-6 h-6">
          <FontAwesomeIcon icon={faCircleUp} aria-hidden="true" />
        </span>
        <div className="h-4" />
        <span className="flex items-center justify-center w-6 h-6">
          <FontAwesomeIcon icon={faCircleDown} aria-hidden="true" />
        </span>
      </div>

      {/* Placeholder body */}
      <div className="flex grow my-2 h-[72px]" />
    </div>
  );
};

export default NoCommBack;
