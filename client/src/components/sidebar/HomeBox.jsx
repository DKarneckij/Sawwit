import CreateCommunityTrigger from '@components/sidebar/CreateCommunityTrigger'

const HomeBox = () => {

  return (
    <div
      className="
        w-[312px] px-3 py-[10px] bg-white rounded
        border border-component-border
      "
    >
      {/* Top Banner */}
      <div
        className="
          h-[34px] -mx-3 -my-[10px] rounded-t
          bg-[url('https://res.cloudinary.com/dperxfai0/image/upload/v1715459157/assets/home-banner.png')]
          bg-cover bg-center
        "
      />

      {/* Section Title */}
      <div className="text-[16px] mt-5 mb-2 ml-2 font-semibold leading-5">
        Home
      </div>

      {/* Description */}
      <div className="text-[15px] mb-[14px]">
        <p>
          Your personal Sawwit frontpage. Come here to check in with your favorite communities.
        </p>
      </div>

      <hr />

      {/* Actions */}
      <div className="flex flex-col mt-3">
        <button
          onClick={() => console.log("Create Post clicked")}
          className="
            inline-flex items-center justify-center h-[30px]
            bg-sawwit-secondary font-bold text-white text-center rounded-full
            hover:bg-sawwit-secondary-hover cursor-pointer
          "
        >
          Create Post
        </button>

        <div className="flex justify-center mt-2">
          <CreateCommunityTrigger />
        </div>
      </div>
    </div>
  );
};

export default HomeBox;
