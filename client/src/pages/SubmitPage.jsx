import { useState } from 'react';
import PostTypeTabs from '@components/submit/PostTypeTabs';
import GenericForm from '@components/submit/forms/GenericForm';
import PostActions from 'components/submit/PostActions';

const SubmitPage = () => {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <main className="flex flex-col bg-main-background min-h-[calc(100vh-48px)] py-5 px-6 [@media(max-width:640px)]:p-0">
      {/* Main Container */}
      <div className="grow flex justify-center pt-5">

        {/* Main Section */}
        <div className="grow max-w-[740px]">
          {/* Create Post Header */}
          <div className="flex border-b border-border-hover my-4 p-1 pb-3">
            <div className="flex-1 text-[19px] font-semibold leading-[22px]">Create a post</div>
          </div>
          {/* Post Creation Box */}
          <div className="bg-white font-bold rounded-lg overflow-hidden shadow">

            {/* Tabs */}
            <PostTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Form */}
            <GenericForm activeTab={activeTab} />
            
          </div>
        </div>

        {/* Optional: Right Sidebar for rules */}
        
      </div>
    </main>
  );
};

export default SubmitPage;
