import FirstBox from './FirstBox';
import SecondBox from './SecondBox';

const Sidebar = () => {
  return (
    <aside className="w-[312px] ml-6 max-[1025px]:hidden">
      <FirstBox />
      <SecondBox />
    </aside>
  )
};

export default Sidebar;
