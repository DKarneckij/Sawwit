import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import subsawService from '@services/subsawService';

const SubsawContext = createContext();

export const SubsawProvider = ({ children }) => {
  const { name } = useParams();
  const [subsaw, setSubsaw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubsaw = async () => {
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
  }, [name]);

  return (
    <SubsawContext.Provider value={{ subsaw, setSubsaw, loading }}>
      {children}
    </SubsawContext.Provider>
  );
};



// Custom hook for easy access
export const useSubsaw = () => useContext(SubsawContext);
