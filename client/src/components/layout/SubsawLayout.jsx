import { useParams, Outlet } from 'react-router-dom';
import { SubsawProvider, useSubsaw } from '@contexts/subsawContext';
import SubsawNotFound from '@pages/SubsawNotFoundPage';

const SubsawLayoutWrapper = () => {
  const { subsaw, loading, notFound } = useSubsaw();

  if (loading) return <div>Loading...</div>;
  if (notFound || !subsaw) return <SubsawNotFound />;

  return <Outlet />;
};

const SubsawLayout = () => {
  const { name } = useParams();

  return (
    <SubsawProvider name={name}>
      <SubsawLayoutWrapper />
    </SubsawProvider>
  );
};

export default SubsawLayout;
