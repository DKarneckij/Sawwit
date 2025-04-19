import { useState } from 'react';
import CreateCommunityButton from '@components/sidebar/CreateCommunityButton';
import CreateCommunityModal from '@components/modals/CreateCommunityModal';

const CreateCommunityTrigger = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <CreateCommunityButton onClick={() => setOpenModal(true)} />
      <CreateCommunityModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default CreateCommunityTrigger
