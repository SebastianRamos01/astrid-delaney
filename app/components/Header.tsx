import gsap from 'gsap'
import React from 'react'
import LinkItem from './LinkItem'

export default function Header() {
    return (
    <header className='absolute top-0 z-10 h-20 flex items-center w-full'>
        <div className='flex justify-between items-center w-full px-5 text-background uppercase font-bold text-xs'>
            <LinkItem ItemTo='Instagram'></LinkItem>
            <div className='leading-tight flex items-center gap-1 text-lg font-black'>
                <div>
                    A
                </div>
                <div className='bg-background h-0.5 w-3 rounded'>
                </div>
                <div>
                    D 
                </div>
            </div>
            <LinkItem ItemTo='Email'></LinkItem>
        </div>
    </header>
  )
}
