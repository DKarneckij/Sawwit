import CreatePostBar from '@components/home/CreatePostBar';
import PostsToolbar from '@components/home/PostsToolbar';
import NoCommunities from '@components/home/NoCommunities';
import HomeBox from '@components/sidebar/HomeBox'
import ToS from '@components/sidebar/ToS';

const HomePage = () => {

  return (
    <>
      <main className='flex bg-main-background min-h-[calc(100vh-48px)] py-5 px-6
        [@media(max-width:640px)]:p-0'>
        
        {/*Main Container */}
        <div className=' grow flex justify-center box-border '>

          {/*Main Section */}
          <div className='grow shrink max-w-[640px]'>
            <CreatePostBar />
            <PostsToolbar />
            <NoCommunities />
          </div>

          {/*Right Sidebar */}
          <div className='w-[312px] ml-6 max-[960px]:hidden'>
            <HomeBox />
            <ToS />
          </div>

        </div>
      </main>
    </>
  )
}

export default HomePage