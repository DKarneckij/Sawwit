import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { useSubsaw } from '@contexts/subsawContext';

export default function DateCreated() {
  const { subsaw } = useSubsaw();

  const formatDate = () => {
    const today = new Date(subsaw.date_created);
    return today.toLocaleString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={faCakeCandles}
        className="text-[17px] text-profile-dropdown-gray mr-2"
      />
      <p className="text-search-text text-[15px] font-medium">
        Created {subsaw ? formatDate() : ''}
      </p>
    </div>
  );
}
