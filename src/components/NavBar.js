import Image from 'next/image'
import React from 'react'

export default function NavBar() {
    return (
        <div className='w-full fixed py-1.5 text-[#e06908] font-nun backdrop-blur-sm font-bold px-4 sm:px-8 flex gap-1 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='sm:w-8.5 sm:h-8.5 w-6 h-6 relative'>
                    <Image src="/logo2.png" alt='logo' fill sizes="(max-width: 768px) 100vw, 200px" className="object-contain"/>

                </div>
                <h3 className='sm:text-4xl text-2xl font-extrabold'>Pizza-Adda</h3>
            </div>

            {/* <div className='flex sm:gap-16'>
                <div className=' hidden sm:flex items-center'>
                    <div className="w-50 h-6 rounded-4xl bg-zinc-800"></div>
                    <svg width="26" height="26" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C6.5 0 2 4.5 2 10c0 7.5 12 22 10 22s10-14.5 10-22C22 4.5 17.5 0 12 0z" fill="#ff1f1f" /> <circle cx="12" cy="10" r="4" fill="white" />
                    </svg>
                </div>
            </div>*/}
        </div>
    )
}
