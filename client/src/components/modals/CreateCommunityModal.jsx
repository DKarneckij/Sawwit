import { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/authContext';
import ModalWrapper from '@components/modals/ModalWrapper';
import subsawService from '@services/subsawService'

const CreateCommunityModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('A community name is required');
      return;
    }
    try {
      await subsawService.create(name); // or { name } depending on backend
      await refreshUser();

      setError('');
      setName('');
      onClose();
      navigate(`/s/${name}`);
    } catch (error) {
      setError(error)
    }
  };
  

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 px-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Create a Community</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Community names including capitalization cannot be changed.
        </p>
        <TextInput
          id="community-name"
          placeholder="Community name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          addon="r/"
          required
          className='m-0'
        />
        <div className="text-[13px] py-1 pb-4">
          <p className="text-[#7c7c7c]">
            {21 - name.length} characters remaining
          </p>
          {error && <p className="text-error">{error}</p>}
        </div>

      </div>

      <div className="flex justify-end px-6 py-4">
        <button onClick={onClose} className="cursor-pointer rounded-full px-4 h-[32px] border border-sawwit-secondary hover:bg-search-hover text-[#ff4500] font-bold">
          Cancel
        </button>
        <button onClick={handleSubmit} className="cursor-pointer ml-2 bg-sawwit-secondary rounded-full px-4 h-[32px] hover:bg-sawwit-secondary-hover text-white font-bold">
          Create Community
        </button>
      </div>
    </ModalWrapper>
  );
};

export default CreateCommunityModal;
