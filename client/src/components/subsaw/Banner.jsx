import { useSubsaw } from '@contexts/subsawContext';

const Banner = () => {
  const { subsaw, loading } = useSubsaw();

  if (loading || !subsaw) return null;

  return (
    <>
      {/* Top Banner Strip */}
      <div className="grow h-[80px] bg-sawwit-secondary -mx-6 -mt-5"></div>

      {/* Lower Banner Info */}
      <div className="flex justify-center h-[78px] -mx-6 bg-white border-b border-sawwit-border">
        <div className="flex grow max-w-[984px] px-4">

          {/* PFP */}
          <div className="h-[72px] w-[72px] -mt-4 rounded-full border-4 border-white shrink-0">
            <img
              className="object-cover object-center rounded-full"
              src={subsaw.pfpUrl || "https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png"}
              alt={`${subsaw.displayName} icon`}
            />
          </div>

          {/* Sub Info */}
          <div className="flex flex-col pl-4 pt-2">
            {/* Top Row */}
            <div className="flex items-center">
              <div className="text-[28px] font-bold leading-9">
                {subsaw.displayName}
              </div>

              {/* Join Button */}
              <div className="w-[96px] ml-8">
                <button
                  className="w-full py-[6px] border border-sawwit-secondary text-sawwit-secondary rounded-full hover:bg-search-hover"
                >
                  <div className="text-[15px] font-bold leading-4">Joined</div>
                </button>
              </div>
            </div>

            {/* r/name */}
            <div className="text-[14px] font-semibold leading-4 text-text-muted mt-1">
              r/{subsaw.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
