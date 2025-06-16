import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { usePermission } from '@hooks/usePermission';

const FirstBoxBanner = () => {
  
  const { isModerator } = usePermission()

  return (
    <div className="flex items-center h-[48px] mx-[-12px] rounded-t bg-sawwit-secondary bg-cover text-white">
      <p className="font-bold text-[14px] pl-4">About Community</p>
      <div className="grow"></div>

      {isModerator && (
        <div className="flex items-center hover:bg-sawwit-secondary-hover px-2 py-1 cursor-pointer">
          <FontAwesomeIcon icon={faShieldHalved} className="text-[17px]" />
          <p className="text-[12px] font-bold pl-1">Mod Tools</p>
        </div>
      )}

      <div className="px-1 mx-3 hover:bg-sawwit-secondary-hover cursor-pointer">
        <FontAwesomeIcon icon={faEllipsis} className="text-[17px]" />
      </div>
    </div>
  );
};

export default FirstBoxBanner;
