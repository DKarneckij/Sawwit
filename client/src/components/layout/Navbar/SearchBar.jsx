import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <form action="" className='flex items-center bg-search-background hover:bg-search-hover rounded-full h-[40px] px-4'>
        <label htmlFor="" className='pr-3'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-search-text text-l'/>
        </label>
        <input type="text" placeholder='Search Sawwit' className='w-full focus:outline-none' />
    </form>
  );
};

export default SearchBar;
