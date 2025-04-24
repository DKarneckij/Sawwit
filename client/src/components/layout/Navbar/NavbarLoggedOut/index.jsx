import HomeLogo from '../HomeLogo';
import SearchBar from '../SearchBar';
import LoginTrigger from './LoginTrigger';

const NavbarLoggedOut = () => {
  return (
    <nav className="h-14 py-2 px-3 flex items-center sticky top-0 bg-white">
      <div className='shrink-0'>
        <HomeLogo />
      </div>

      <div className='mx-4 grow flex justify-center max-[1200px]:justify-start h-full'>
        <div className='grow max-w-140 max-[1200px]:max-w-185'>
          <SearchBar />
        </div>
      </div>
      
      <div className='pr-10 max-[1200px]:pr-4 max-[1050px]:pr-0'>
        <LoginTrigger />
      </div>
    </nav>
  );
};

export default NavbarLoggedOut;
