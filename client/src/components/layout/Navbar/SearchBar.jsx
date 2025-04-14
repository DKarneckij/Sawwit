import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
      <form action="" className='flex items-center w-full bg-search-background background rounded-full h-[40px] px-4'>
        <label htmlFor="">
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-search-text text-l pr-2 p-[1px]'/>
        </label>
        <input type="text" placeholder='Search Sawwit' className='text-[15px] w-full focus:outline-none' />
      </form>
  );
};

export default SearchBar;