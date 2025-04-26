import React from 'react';

const PostActions = ({ isFormValid }) => {
  return (
    <div className="flex justify-end items-center gap-2 text-[14px] font-bold py-4 mr-3">
      
      {/* Cancel Button */}
      <button
        type="button"
        className="cursor-pointer px-4 py-1 text-sawwit-secondary border rounded-full border-sawwit-secondary hover:bg-[#f5f5f5]"
      >
        Cancel
      </button>
      
      {/* Post Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`px-4 py-1 font-bold text-center rounded-full transition-colors duration-150 ${
          isFormValid
            ? 'cursor-pointer bg-sawwit-secondary text-white hover:bg-sawwit-secondary-hover'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        Post
      </button>

    </div>
  );
};

export default PostActions;
