import { useState } from 'react';
import { useSubsaw } from '@contexts/subsawContext';
import subsawService from '@services/subsawService';

const JoinLeaveButton = () => {
  const { subsaw, setSubsaw } = useSubsaw();
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (!subsaw) return;
    setLoading(true);

    try {
      if (subsaw.isSubscribed) {
        await subsawService.leave(subsaw.subsawName);
        setSubsaw({
          ...subsaw,
          isSubscribed: false,
          subscriberCount: subsaw.subscriberCount - 1,
        });
      } else {
        await subsawService.join(subsaw.subsawName);
        setSubsaw({
          ...subsaw,
          isSubscribed: true,
          subscriberCount: subsaw.subscriberCount + 1,
        });
      }
    } catch (err) {
      console.error('Failed to toggle subscription:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const isJoined = subsaw?.isSubscribed;
  const buttonText = isJoined ? (hover ? 'Leave' : 'Joined') : 'Join';

  const baseStyle =
    'w-full py-[6px] rounded-full text-[15px] font-bold leading-4 transition-colors duration-150';

  const joinStyle =
    'bg-sawwit-secondary text-white hover:bg-sawwit-secondary-hover';

  const joinedStyle =
    'border border-sawwit-secondary text-sawwit-secondary bg-white hover:bg-search-hover';

  const leaveStyle =
    'border border-error text-error bg-white hover:bg-border-hover';

  const buttonClass = isJoined
    ? hover
      ? leaveStyle
      : joinedStyle
    : joinStyle;

  return (
    <button
      disabled={loading}
      onClick={handleToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${baseStyle} ${buttonClass} cursor-pointer`}
    >
      {buttonText}
    </button>
  );
};

export default JoinLeaveButton;
