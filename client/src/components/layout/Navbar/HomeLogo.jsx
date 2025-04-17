import { Link } from 'react-router-dom'; // Use Link instead of <a> for proper SPA navigation

const HomeLogo = () => {
  return (
    <Link to="/" className="h-[32px] inline-flex items-center shrink-0">
      <img
        src="https://res.cloudinary.com/dperxfai0/image/upload/v1718229394/assets/logo-graphic.svg"
        alt="Graphic"
        className="h-[24px] pr-2"
        loading="lazy"
      />
      <img
        src="https://res.cloudinary.com/dperxfai0/image/upload/v1718229394/assets/logo-name.svg"
        alt="Name"
        className="max-h-full h-[22px] max-[1050px]:hidden"
        loading="lazy"
      />
    </Link>
  );
};

export default HomeLogo;
