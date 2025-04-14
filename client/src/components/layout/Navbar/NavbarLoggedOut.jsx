import HomeLogo from './HomeLogo';
import SearchBar from './SearchBar';

const NavbarLoggedOut = () => {
  return (
    <>
      <nav className="h-12 px-3 flex items-center sticky top-0">
        
        <HomeLogo />

        <div className="w-full max-w-[750px] mx-auto">
          <SearchBar />
        </div>

      </nav>
    </>
  );
};

export default NavbarLoggedOut;
