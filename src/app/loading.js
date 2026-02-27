import Image from 'next/image'
import React from 'react'

function Loading() {
  return (
    <div className='w-full h-screen overflow-hidden flex items-center justify-center bg-transparent'>
        <Image src={'/loading-pizza.png'} width={450} height={450} alt='loading' className=' animate-[spin_linear_8s_infinite]'/>
    </div>
  )
}
export default Loading