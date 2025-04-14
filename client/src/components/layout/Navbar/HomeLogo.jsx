import { Link } from 'react-router-dom'; // Use Link instead of <a> for proper SPA navigation

const HomeLogo = () => {
  return (
    <Link to="/" className="h-12 inline-flex">
      <img
        src="https://res.cloudinary.com/dperxfai0/image/upload/v1718229394/assets/logo-graphic.svg"
        alt="Graphic"
        className="max-h-full py-2 pr-2"
        loading="lazy"
      />
      <img
        src="https://res.cloudinary.com/dperxfai0/image/upload/v1718229394/assets/logo-name.svg"
        alt="Name"
        className="max-h-full py-3 max-[1050px]:hidden"
        loading="lazy"
      />
    </Link>
  );
};

export default HomeLogo;
