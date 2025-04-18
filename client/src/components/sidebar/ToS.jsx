export default function ToS() {
  return (
    <div className='
      p-2 my-4 bg-white rounded text-[12px]
      border border-component-border'>

      {/*Top Section */}
      <div className='flex'>

        <div className='flex flex-col px-1 w-1/2 gap-2'>
          <p className='cursor-pointer'>User Agreement</p>
          <p className='cursor-pointer'>Privacy Policy</p>
        </div>

        <div className='flex flex-col px-1 w-1/2 gap-[6px]'>
          <p className='cursor-pointer'>Content Policy</p>
          <p className='cursor-pointer'>Moderator Code of Conduct</p>
        </div>

      </div>

      <hr className='my-[6px]' />

      {/*Bottom Section */}
      <div className=''>
        <p>Sawwit, Inc. © 2024. All Rights Reserved </p>
      </div>
      
    </div>
  )
}
