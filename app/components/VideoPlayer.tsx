'use client'

import React, { useEffect, useRef, useState } from 'react'
import { projects } from '../data/mainData'

type VideoPlayerProps = {
  handleIsOpen: () => void
  videoIndex: number
  isVideoOpen?: boolean
}

export default function VideoPlayer({ handleIsOpen, videoIndex, isVideoOpen }: VideoPlayerProps) {

    const project = projects[videoIndex];

    const [isPaused, setIsPaused] = useState(false)
    const [progress, setProgress] = useState(0) // porcentaje (0 - 100)

    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePaused = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
                setIsPaused(false)
            } else {
                videoRef.current.pause();
                setIsPaused(true)
            }
        }
    };

    // const [isMuted, setIsMuted] = useState(true)
    // const toggleSound = () => setIsMuted(prev => !prev);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent || 0);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        };
    }, [videoIndex]);

    return (
        <div className={`absolute top-0 w-full h-full z-30 p-4 ${isVideoOpen ? 'opacity-100' : 'opacity-50'}`}>
            <div className='bg-stone-900 size-full rounded relative'>
                <div className='p-3 absolute top-0 left-0 z-10 flex flex-col gap-1'>
                    <div className='font-bebas text-4xl leading-[84%]'>
                        {project.title}
                    </div>
                    <div className='text-sm font-medium font-inter text-stone-400'>
                        {project.studio}
                    </div>
                </div>
                <div
                    onClick={handleIsOpen}
                    className='w-fit right-0 top-0 absolute m-3 z-10 cursor-pointer'>
                    <div className='w-fit bg-background rounded-full p-2'>
                        <svg className="size-5 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                    </div>
                </div>
                {
                    isPaused && (
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                            <div
                                onClick={togglePaused}
                                className='w-fit bg-background rounded-full p-2 cursor-pointer'>
                                <svg className="size-5 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    )
                }
                <div className='size-full absolute bottom-0 overflow-hidden'>
                    {
                        project && (
                            <div
                                onClick={togglePaused}
                                className='size-full object-cover'>
                                <video
                                    src={project.videoSrc}
                                    ref={videoRef}
                                    autoPlay
                                    className='object-cover size-full cursor-pointer'></video>
                            </div>
                        )
                    }
                </div>
                <nav className='flex items-center absolute bottom-0 w-full p-3 gap-2'>
                    <div
                        className='bg-background rounded-full p-2 cursor-pointer'
                        onClick={togglePaused}>
                        {isPaused ? (
                            <svg className="size-5 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="size-5 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    {/* <div>
                    <div
                        onClick={toggleSound} 
                        className='w-fit bg-background rounded-full p-2 hidden cursor-pointer'>
                        <svg className="size-5 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z"/>
                            <path fillRule="evenodd" d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div 
                        onClick={toggleSound}
                        className='w-fit bg-background rounded-full p-2 cursor-pointer'>
                        <svg className="size-5 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5.707 4.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414l-.004-.005C21.57 16.498 22 13.938 22 12a9.972 9.972 0 0 0-2.929-7.071 1 1 0 1 0-1.414 1.414A7.972 7.972 0 0 1 20 12c0 1.752-.403 3.636-1.712 4.873l-1.433-1.433C17.616 14.37 18 13.107 18 12c0-1.678-.69-3.197-1.8-4.285a1 1 0 1 0-1.4 1.428A3.985 3.985 0 0 1 16 12c0 .606-.195 1.335-.59 1.996L13 11.586V6.135c0-1.696-1.978-2.622-3.28-1.536L7.698 6.284l-1.99-1.991ZM4 8h.586L13 16.414v1.451c0 1.696-1.978 2.622-3.28 1.536L5.638 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/>
                        </svg>
                    </div>
                </div> */}
                    <div
                        className='w-full'
                    >
                        <div className="relative w-full h-1 bg-stone-600 rounded">
                            <div
                                className="absolute top-0 left-0 h-1 bg-background rounded"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        {/* <div className="flex justify-between text-[0.65rem] mt-1 text-stone-300 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                        </div> */}
                    </div>
                </nav>
            </div>
        </div>
    )
}

// function formatTime(time: number) {
//   if (isNaN(time)) return "0:00";
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60).toString().padStart(2, "0");
//   return `${minutes}:${seconds}`;
// }
