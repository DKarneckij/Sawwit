const CreateCommunityButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        grow h-[30px] mt-3 text-[14px]
        border border-sawwit-secondary text-sawwit-secondary font-bold text-center
        rounded-full hover:bg-[#f5f5f5] cursor-pointer
      "
    >
      Create Community
    </button>
  );
};

export default CreateCommunityButton;
