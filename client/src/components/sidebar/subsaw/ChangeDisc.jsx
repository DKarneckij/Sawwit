import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import subsawService from '@services/subsawService';
import { useSubsaw } from '@contexts/subsawContext';

export default function ChangeDisc({ setEditDisc }) {
  const { name } = useParams();
  const { subsaw, setSubsaw } = useSubsaw();

  const [disc, setDisc] = useState(subsaw?.description || '');

  useEffect(() => {
    setDisc(subsaw?.description || '');
  }, [subsaw]);

  const changeDisc = (event) => {
    setDisc(event.target.value);
  };

  const closeDisc = () => {
    setEditDisc(false);
  };

  const updateDisc = async () => {
    try {
      const updatedSubsaw = await subsawService.updateSubsaw(name, {
        description: disc,
      });
      setSubsaw(updatedSubsaw);
      setEditDisc(false);
    } catch (err) {
      console.error('Failed to update description:', err.message);
    }
  };

  return (
    <div className='p-2 mt-7 mb-2 rounded border border-[#d5d7d8] bg-[#f6f7f8] hover:border-[#47b0db] focus:outline-none'>
      <textarea
        value={disc}
        placeholder='Tell us about your community'
        onChange={changeDisc}
        className='h-32 w-full resize-none focus:outline-none bg-[#f6f7f8]'
      />
      <div className='flex items-center'>
        <p className='text-[12px] text-[#939494]'>{500 - disc.length} characters remaining</p>
        <div className='grow'></div>
        <button
          className='text-red-500 cursor-pointer font-extrabold text-[12px] mr-2 focus:outline-none'
          onClick={closeDisc}
        >
          Cancel
        </button>
        <button
          className='cursor-pointer text-blue-500 font-extrabold text-[12px] focus:outline-none'
          onClick={updateDisc}
        >
          Save
        </button>
      </div>
    </div>
  );
}
