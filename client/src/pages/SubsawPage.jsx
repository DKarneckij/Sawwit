import { SubsawProvider, useSubsaw } from '@contexts/subsawContext';
import Banner from '@components/subsaw/banner';
import SubsawNotFound from '@pages/SubsawNotFoundPage';
import CreatePostBar from '@components/post/CreatePostBar';
import PostsToolbar from '@components/post/PostsToolbar';
import Sidebar from '@components/subsaw/sidebar'

const SubsawContent = () => {
  const { loading, notFound } = useSubsaw();

  if (loading) return <div>Loading...</div>;
  if (notFound) return <SubsawNotFound />;

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />

      {/* This fills the rest of the screen with gray */}
      <div className="flex-1 flex justify-center  bg-main-background p-4 max-[640px]:p-0">
        <main className="w-full max-w-[640px]">
          <CreatePostBar />
          <PostsToolbar />
        </main>

        <Sidebar />
        
      </div>
    </div>
  );
};


const SubsawPage = () => (
  <SubsawProvider>
    <SubsawContent />
  </SubsawProvider>
);

export default SubsawPage;
