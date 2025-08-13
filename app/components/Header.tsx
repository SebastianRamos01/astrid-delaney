import gsap from 'gsap'
import React from 'react'
import LinkItem from './LinkItem'

export default function Header() {
    return (
    <header className='absolute top-0 z-10 h-20 flex items-center w-full'>
        <div className='flex justify-between items-center w-full px-5 text-background uppercase font-bold text-xs'>
            <LinkItem ItemTo='Instagram'></LinkItem>
            <div className='leading-tight '>
                <div>
                    Astrid 
                </div>
                <div>
                    Delaney 
                </div>
                <div className='text-end'>
                    Astrid 
                </div>
            </div>
            <LinkItem ItemTo='Email'></LinkItem>
        </div>
    </header>
  )
}
