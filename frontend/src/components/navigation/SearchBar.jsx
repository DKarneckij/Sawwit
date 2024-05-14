import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {

  

  return (
    <div className={'${props.className} flex items-center w-full mx-3 rounded-full border border-border_hover hover:border-border_focus'}>
      <form action="" className='flex items-center w-full bg-search_background rounded-full h-[40px] px-4'>
        <label htmlFor="" className=''>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-search_color text-xl pr-3'/>
        </label>
        <input type="text" placeholder='Search Sawwit' className='w-full bg-search_background focus:outline-none' />
      </form>
    </div>
  );
};

export default SearchBar;