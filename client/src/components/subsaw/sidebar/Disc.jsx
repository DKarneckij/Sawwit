import { useState } from 'react';
import { useSubsaw } from '@contexts/subsawContext';
import { usePermission } from '@hooks/usePermission';
import ChangeDisc from './ChangeDisc';

export default function Disc() {
  const [editDisc, setEditDisc] = useState(false);
  const { subsaw } = useSubsaw();
  const { canEditDescription } = usePermission();

  if (!subsaw) return null;

  // Moderator view
  if (canEditDescription) {
    return (
      <>
        {subsaw.description && !editDisc && (
          <div
            className="p-2 mt-7 mb-2 rounded border border-component-border bg-border-hover hover:border-border-focus cursor-pointer"
            onClick={() => setEditDisc(true)}
          >
            <p className="text-[12px] font-bold text-sawwit-secondary">
              {subsaw.description}
            </p>
          </div>
        )}

        {!subsaw.description && !editDisc && (
          <div
            className="p-2 mt-7 mb-2 rounded border border-component-border bg-border-hover hover:border-border-focus cursor-pointer"
            onClick={() => setEditDisc(true)}
          >
            <p className="text-[12px] font-bold text-sawwit-secondary">
              Add a description
            </p>
          </div>
        )}

        {editDisc && <ChangeDisc setEditDisc={setEditDisc} />}
      </>
    );
  }

  // Non-moderator view
  return (
    <div className="mt-4 mb-2">
      <p className="text-[15px] text-primary-text leading-snug break-words whitespace-pre-wrap">
        {subsaw.description}
      </p>
    </div>
  );
}
