import { useState } from 'react';
import TitleInput from '@components/submit/forms/TitleInput';
import TextForm from '@components/submit/forms/TextForm';
// import MediaForm from '@components/submit/forms/MediaForm';
// import LinkForm from '@components/submit/forms/LinkForm';
import PostActions from '@components/submit/PostActions';

const GenericForm = ({ activeTab }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isFormValid = title.trim().length > 0 && content.trim().length > 0;


  const handleSubmit = (e) => {

    if (!isFormValid) {
      console.log('Form invalid: missing title or content.');
      return; // Stop submission if form is invalid
    }

    e.preventDefault();
    console.log('Submitting:', { title, content, activeTab });
    // TODO: Replace with your actual API call
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">

      {/* Title Input */}
      <TitleInput title={title} setTitle={setTitle} />

      {/* Content Input based on Active Tab */}
      {activeTab === 'text' && (
        <TextForm content={content} setContent={setContent} />
      )}
      {activeTab === 'media' && (
        <div className="text-gray-400 text-center py-10">Media upload form coming soon...</div>
        // <MediaForm content={content} setContent={setContent} />
      )}
      {activeTab === 'link' && (
        <div className="text-gray-400 text-center py-10">Link sharing form coming soon...</div>
        // <LinkForm content={content} setContent={setContent} />
      )}

      {/* Post and Cancel Buttons */}
      <PostActions isFormValid={isFormValid} />

    </form>
  );
};

export default GenericForm;
