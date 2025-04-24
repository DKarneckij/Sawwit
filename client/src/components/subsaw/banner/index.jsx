import { useSubsaw } from '@contexts/subsawContext';
import JoinLeaveButton from './JoinLeaveButton';


const Banner = () => {
  const { subsaw, loading } = useSubsaw();

  if (loading || !subsaw) return null;

  const hasBanner = !!subsaw.bannerUrl;

  return (
    <header>
      
      {/*Banner Upper*/}
      <div className='grow h-[80px] bg-sawwit-secondary'/>

      {/*Banner Lower*/}
      <div className='flex justify-center h-[78px] bg-white'>
        <div className='flex grow max-w-[984px] max-[1025px]:max-w-[640px] '>

          {/*Subreddit PFP */}
          <div className='h-[72px] w-[72px] -mt-4 rounded-full border-4 border-white'>
            <img className='object-cover object-center rounded-full' src="https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png" alt="" />
          </div>

          {/*Names Container */}
          <div className='flex flex-col pl-4 pt-2'>

            {/*Top Subreddit Container */}
            <div className='flex items-center'>

                {/*Subreddit Name */}
                <div className='text-[28px] font-bold leading-9'>
                  {subsaw ? subsaw.displayName : ""}
                </div>

                {/*Join Button */}
                <div className='w-[96px] ml-8'>
                  <JoinLeaveButton />
                </div>

            </div>

            {/*Bottom Subreddit Container */}
            <div className='text-[14px] font-semibold leading-4 text-[#7c7c7c] mt-1'>
              r/{subsaw ? subsaw.displayName : ""}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
