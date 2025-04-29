import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import TitleInput from '@components/submit/forms/TitleInput';
import TextForm from '@components/submit/forms/TextForm';
// import MediaForm from '@components/submit/forms/MediaForm';
// import LinkForm from '@components/submit/forms/LinkForm';
import PostActions from '@components/submit/PostActions';
import postService from '@services/postService';

const GenericForm = ({ activeTab }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isFormValid = title.trim().length > 0 && content.trim().length > 0;
  const { subsawName } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { id: createdPostId } = await postService.create({
        title,
        content,
        type: activeTab,
        subsawName
      });
  
      navigate(`/s/${subsawName}/posts/${createdPostId}`);
    } catch (error) {
      console.error('Failed to create post:', error.message || error);
    }
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
