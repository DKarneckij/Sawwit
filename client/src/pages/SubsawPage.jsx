import { SubsawProvider } from '@contexts/subsawContext';
import Banner from '@components/subsaw/Banner';


const SubsawPage = () => {
  return (
    <SubsawProvider>
      <main className='flex flex-col bg-main_background min-h-[calc(100vh-48px)] py-5 px-6 [@media(max-width:640px)]:p-0'>
        
        <Banner/>

        {/*Main Container */}
        <div className='grow flex justify-center pt-5'>
          
        </div>
      </main>
    </SubsawProvider>
  )
}

export default SubsawPage