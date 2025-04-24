import React from 'react'
import { useSubsaw } from '@contexts/subsawContext'

export default function MembersAmount() {

  const { subsaw } = useSubsaw()

  return (
    <div className='flex flex-col gap-0'>
      <p className='font-semibold text-[17px] p-0 m-0'>{subsaw ? subsaw.subscriberCount : '0'}</p>
      <p className='text-[12px] font-semibold text-[#939494]'>Members</p>
    </div>
  )
}
