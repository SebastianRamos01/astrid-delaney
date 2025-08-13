import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

export default function LinkItem({ ItemTo } : { ItemTo : string}) {

    const linkRef = useRef<HTMLDivElement>(null)
    const underLinkRef = useRef<HTMLDivElement>(null)
    const tlRef = useRef<GSAPTimeline | null>(null)

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true})
        tlRef.current
            .to(linkRef.current, {
                y: '-100%',
                skewY: 30,
                duration: 0.4,
            })
            .fromTo(underLinkRef.current, {
                y: '0%',
                skewY: 30
            },{
                y: '-100%',
                skewY: 0,
                duration: 0.4,
            }, '<')
    })

    const handleMouseEnter = () => {
        tlRef.current?.play()
    }
    
    const handleMouseLeave = () => {
        tlRef.current?.reverse()
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative h-fit overflow-hidden cursor-pointer'>
            <div
                ref={linkRef}
                id='link-text'
                className='origin-bottom-right'>
                {ItemTo}
            </div>
            <div 
                ref={underLinkRef}
                id='under-link-text'
                className='absolute top-full origin-bottom-left'>
                {ItemTo}
            </div>
        </div>
    )
}
