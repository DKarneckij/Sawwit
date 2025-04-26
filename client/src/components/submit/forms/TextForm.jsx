import React from 'react';

export default function TextForm({ content, setContent }) {
  return (
    <div>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Text (required)"
        maxLength={40000}
        className="w-full min-h-[160px] p-3 border border-border-hover rounded resize-y overflow-auto text-[14px] font-normal focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150"
      />
    </div>
  );
}
