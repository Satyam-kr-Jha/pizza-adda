import Image from 'next/image'
import React from 'react'

export default function Load() {
  return (
    <div className='w-full h-screen overflow-hidden flex items-center justify-center bg-[#121212]'>
        <Image loading='eager' src={'/loading-pizza.png'} width={450} height={450} alt='loading' className=' animate-[spin_linear_8s_infinite]'/>
    </div>
  )
}
