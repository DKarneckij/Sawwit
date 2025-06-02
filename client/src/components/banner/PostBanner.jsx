import { useSubsaw } from '@contexts/subsawContext';

const Banner = () => {
  const { subsaw, loading } = useSubsaw();

  if (loading || !subsaw) return null;

  return (
    <header>

      {/*Banner*/}
      <div className='flex justify-center items-center h-[78px] bg-sawwit-secondary px-5'>
        <div className='flex grow max-w-[1284px] max-[1025px]:max-w-[940px]'>

          {/*Subreddit PFP */}
          <div className='h-[50px] w-[50px] rounded-full border-4 border-white'>
            <img className='object-cover object-center rounded-full' src="https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png" alt="" />
          </div>

          {/*Names Container */}
          <div className='flex flex-col pl-4'>
            {/*Bottom Subreddit Container */}
            <div className='text-[28px] font-bold leading-9 text-white mt-1'>
              r/{subsaw ? subsaw.displayName : ""}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
