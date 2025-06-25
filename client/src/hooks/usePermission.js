import { useAuth } from '@contexts/authContext';
import { useSubsaw } from '@contexts/subsawContext';

export const usePermission = () => {
  const { user } = useAuth();
  const { subsaw } = useSubsaw();

  const isModerator = user?.subsawsJoined?.some(
    (s) => s._id === subsaw?._id && s.isModerator
  );

  return {
    isModerator,
    canEditDescription: isModerator,
    canUploadMedia: isModerator,
  };
};
