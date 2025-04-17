import HomeLogo from '@layout/Navbar/HomeLogo';
import SearchBar from '@layout/Navbar/SearchBar';
import IconsAndUser from './IconsAndUser';

const NavbarLoggedIn = () => {
  return (
    <nav className="h-14 py-2 px-3 flex items-center sticky top-0">
      <div className='shrink-0'>
        <HomeLogo />
      </div>

      <div className='mx-4 grow flex justify-center max-[1200px]:justify-start h-full'>
        <div className='grow max-w-140 max-[1200px]:max-w-185'>
          <SearchBar />
        </div>
      </div>

      <IconsAndUser />
      

    </nav>
  );
};

export default NavbarLoggedIn;
