import React from 'react';
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

const PostTypeTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'text', label: 'Text', icon: <BsChatLeftTextFill /> },
    { id: 'media', label: 'Image & Video', icon: <FaImage /> },
    { id: 'link', label: 'Link', icon: <IoIosLink /> },
  ];

  return (
    <div className="flex text-search-text divide-x divide-nocommunities-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`cursor-pointer flex items-center justify-center gap-2 flex-1 py-[15px] px-[17px] text-[14px] leading-[18px] border-b border-border-hover transition-colors ${
            activeTab === tab.id ? 'border-b-3 border-b-sawwit-secondary text-sawwit-secondary bg-border-hover' : ''
          }`}
        >
          <span className="text-[16px]">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PostTypeTabs;
