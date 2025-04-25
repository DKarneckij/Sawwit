import { useState } from 'react';
import { useSubsaw } from '@contexts/subsawContext';
import { useAuth } from '@contexts/authContext';
import subsawService from '@services/subsawService';

const JoinLeaveButton = () => {
  const { subsaw, setSubsaw } = useSubsaw();
  const { user, setUser } = useAuth();

  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!subsaw || !user) return null;

  const isJoined = user.subsawsJoined?.some(sub => sub.id === subsaw.id);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isJoined) {
        await subsawService.leave(subsaw.subsawName);

        // Remove from user context
        const updatedUser = {
          ...user,
          subsawsJoined: user.subsawsJoined.filter(sub => sub.id !== subsaw.id),
        };
        setUser(updatedUser);

        // Update subsaw subscriber count
        setSubsaw({
          ...subsaw,
          subscriberCount: subsaw.subscriberCount - 1,
        });
      } else {
        await subsawService.join(subsaw.subsawName);

        const newSub = {
          id: subsaw.id,
          name: subsaw.name,
          displayName: subsaw.displayName,
          pfpUrl: subsaw.pfpUrl,
          isModerator: false, // Default assumption
        };

        const updatedUser = {
          ...user,
          subsawsJoined: [...user.subsawsJoined, newSub],
        };
        setUser(updatedUser);

        setSubsaw({
          ...subsaw,
          subscriberCount: subsaw.subscriberCount + 1,
        });
      }
    } catch (err) {
      console.error('Failed to toggle subscription:', err.message);
    } finally {
      setLoading(false);
    }
  };

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
