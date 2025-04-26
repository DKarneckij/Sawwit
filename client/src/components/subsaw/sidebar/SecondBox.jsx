import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useSubsaw } from '@contexts/subsawContext';
import ModeratorLink from './ModeratorLink';

const SecondBox = () => {
  const { subsaw } = useSubsaw();

  if (!subsaw || !subsaw.moderators || subsaw.moderators.length === 0) return null;

  return (
    <div className='
      w-[312px] px-3 py-[10px] mt-3 bg-white rounded
      border border-[#d2d2d2]'>
      {/* Top Banner */}
      <div className='flex items-center h-[42px] mx-[-12px] my-[-10px] rounded-t bg-sawwit-secondary bg-cover text-white'>
        <p className='font-bold text-[14px] pl-4'>Moderators</p>
        <div className='grow'></div>
      </div>

      {/* Message the Mods Button */}
      <div className='flex'>
        <button 
          className='cursor-pointer inline-flex items-center justify-center h-[32px] mt-6 border border-sawwit-secondary text-sawwit-secondary rounded-full hover:bg-border-hover grow'>
          <FontAwesomeIcon icon={faEnvelope} className='text-[20px] pt-[2px]' />
          <p className='font-bold text-center pl-1'>Message the Mods</p>
        </button>
      </div>

      {/* Moderator Links */}
      <div className='mt-3 flex flex-col gap-1 text-[12px] font-semibold text-sawwit-secondary'>
        {subsaw.moderators.map((mod) => (
          <ModeratorLink key={mod.id} username={mod.username} />
        ))}
      </div>
    </div>
  );
};


export default SecondBox;
