import React, { useRef, useEffect } from 'react';

export default function TextForm({ body, setBody }) {
  const textareaRef = useRef(null);

  // Auto-resize body field
  const autoResize = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.addEventListener('input', autoResize);
    return () => textareaRef.current.removeEventListener('input', autoResize);
  }, []);

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  return (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        value={body}
        onChange={handleBodyChange}
        placeholder="Text (optional)"
        maxLength={40000}
        className="w-full min-h-[160px] p-3 border border-border-hover rounded resize-y text-[14px] font-normal leading-[20px] focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-150 antialiased"
      />
    </div>
  );
}
