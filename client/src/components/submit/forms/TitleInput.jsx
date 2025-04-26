import React, { useRef, useEffect } from 'react';

export default function TitleInput({ title, setTitle }) {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener('input', autoResize);
    return () => textarea.removeEventListener('input', autoResize);
  }, []);

  return (
    <div className="space-y-1">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          maxLength={300}
          rows={1}
          className="w-full min-h-[48px] pl-4 py-3 pr-[68px] border border-border-hover rounded resize-none overflow-hidden text-[14px] leading-[20px] font-normal overflow-x-hidden focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 antialiased"
        />
      </div>
      <div className="flex justify-end pr-2 text-[10px] text-[#878A8C]">
        {title.length}/300
      </div>
    </div>
  );
}
