'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const tl = gsap.timeline();

export default function Loader({ Children } : { Children: React.ReactNode}) {

    useGSAP(() => {
      tl.to('#image-sub-cont', {
        y: '-100%',
        ease: 'expo.in',
        duration: 1.2,
        delay: 0.5,
      })
      tl.to('#loader-text-cont', {
        opacity: 0,
        delay: 1,
        duration: 1
      }, '<')
      tl.to('#block-up', {
        y: '-100%',
        duration: 0.7,
        ease: 'expo.in'
      }, '<')  
    })

  return (
    <div className="h-screen w-full relative overflow-hidden">
        <div id="block-up" className="h-full w-full bg-[#1a1a1a] absolute top-0 z-50">
        </div>
        <div id="loader-text-cont" className="overflow-hidden w-fit uppercase text-background font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex items-center flex-col md:flex-row gap-3">
            <p id="loader-text" className="origin-bottom-left ">
              Hello
            </p>
            <div className="overflow-hidden w-[70dvw] md:w-[30dvw] h-[30dvh]">
              <div id="image-sub-cont" className="size-full relative">
                <Image 
                  src={'/images/Astrid-Delaney.png'}
                  alt="Astrid Delaney Logo"
                  fill
                  className="object-cover"
                  priority
                ></Image>
              </div>
            </div>
            <p>
              I'm
            </p>
          </div>
        </div>
            {Children}
    </div>
  )
}
