import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import subsawService from '@services/subsawService';
import { useAuth } from '@contexts/authContext'; // ✅ import auth

const SubsawContext = createContext();

export const SubsawProvider = ({ children }) => {
  const { name } = useParams();
  const { user } = useAuth(); // ✅ get current user from context
  const [subsaw, setSubsaw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubsaw = async () => {
      setLoading(true); // ✅ needed to re-trigger loading state
      try {
        const data = await subsawService.getByName(name);
        console.log(data);
        setSubsaw(data);
      } catch (err) {
        console.error('Failed to fetch subsaw:', err.message);
        setSubsaw(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubsaw();
  }, [name, user]); // ✅ refetch subsaw when user logs in/out

  return (
    <SubsawContext.Provider value={{ subsaw, setSubsaw, loading }}>
      {children}
    </SubsawContext.Provider>
  );
};

export const useSubsaw = () => useContext(SubsawContext);
