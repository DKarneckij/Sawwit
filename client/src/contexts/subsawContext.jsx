import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import subsawService from '@services/subsawService';
import { useAuth } from '@contexts/authContext'; // ✅ import auth

const SubsawContext = createContext();

export const SubsawProvider = ({ children }) => {
  const { subsawName } = useParams();
  const [subsaw, setSubsaw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubsaw = async () => {
      setLoading(true); // ✅ needed to re-trigger loading state
      try {
        const data = await subsawService.getByName(subsawName);
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
  }, [subsawName]);

  return (
    <SubsawContext.Provider value={{ subsaw, setSubsaw, loading }}>
      {children}
    </SubsawContext.Provider>
  );
};

export const useSubsaw = () => useContext(SubsawContext);
