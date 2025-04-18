import NoCommBack from './NoCommBack.jsx';

export default function NoCommunities() {
  return (
    <div className="relative">
      {/* Background faded posts */}
      <div className="pointer-events-none opacity-60 select-none">
        {Array.from({ length: 10 }).map((_, idx) => (
          <NoCommBack key={idx} />
        ))}
      </div>

      {/* Foreground message */}
      <div className="absolute inset-0 flex flex-col justify-start items-center">
        <div className="flex flex-col items-center justify-center my-20 w-[80%] text-center">
          <img
            src="https://res.cloudinary.com/dperxfai0/image/upload/v1715459159/assets/telescope.png"
            alt="Telescope"
            className="h-[150px]"
          />
          <p className="text-[18px] mt-3 font-semibold leading-snug">
            Sawwit gets better when you join communities, so find some that you'll love!
          </p>
          <a
            href="#"
            className="px-7 py-[5px] mt-4 rounded-full text-white bg-sawwit-secondary hover:bg-sawwit-secondary-hover font-bold"
          >
            Browse Popular Posts
          </a>
        </div>
      </div>
    </div>
  );
}