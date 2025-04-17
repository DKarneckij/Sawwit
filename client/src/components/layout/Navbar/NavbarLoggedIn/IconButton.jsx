import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ icon, size = 'text-xl', href, onClick }) => {
  const Wrapper = href ? 'a' : 'button';

  return (
    <Wrapper
      href={href}
      onClick={onClick}
      className="w-[32px] h-[32px] rounded-full p-5 hover:bg-border-hover flex justify-center items-center"
    >
      <FontAwesomeIcon icon={icon} className={size} />
    </Wrapper>
  );
};

export default IconButton;
