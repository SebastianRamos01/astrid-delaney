'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { projects, namePage, subTitlePage } from './data/mainData'
import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";


export default function Home() {
  
  const DURATION = 6;
  const [videoIndex, setVideoIndex] = useState(0);

  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const barTween = useRef<gsap.core.Tween | null>(null);
  const progressBarDesktopRefs = useRef<HTMLDivElement[]>([]);
  const progressBarMobileRefs = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const words = namePage.split(' ');

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const toggleVideoOpen = () => setIsVideoOpen(prev => !prev);

   // Función para iniciar un timer sincronizado con GSAP progress
  const startTimer = (time = DURATION * 1000) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setTimeout(() => {
      setVideoIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    }, time);
  };

  // Timer inicial
  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Click en artículo → cambio de video y reinicio de timer
  const handleClick = (index: number) => {
    setVideoIndex(index);
    startTimer();
  };

  // Animación de barra
  useEffect(() => {
    const ctx = gsap.context(() => {
      const allBars = [
        ...progressBarMobileRefs.current,
        ...progressBarDesktopRefs.current,
      ];

      // Resetear todas las barras
      allBars.forEach((bar, i) => {
        gsap.set(bar, { scaleX: i === videoIndex ? 0 : 1 });
      });

      // Animar la barra activa (mobile + desktop en el mismo índice)
      barTween.current = gsap.fromTo(
        [progressBarMobileRefs.current[videoIndex], progressBarDesktopRefs.current[videoIndex]],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DURATION,
          ease: "linear",
        }
      );
    });

    return () => ctx.revert();
  }, [videoIndex]);

  // Animación de videos (fade)
  useEffect(() => {
    projects.forEach((_, i) => {
      gsap.to(`#bg-video-${i}`, {
        opacity: i === videoIndex ? 1 : 0,
        duration: 1,
        ease: "power2.out",
      });
    });
    projects.forEach((_, i) => {
      gsap.to(`#list-article-${i}`, {
        opacity: i === videoIndex ? 1 : 0,
        duration: 1,
        ease: "power2.out",
      });
    });
  }, [videoIndex]);

  // Pausar / Reanudar cuando se abre/cierra el modal
  useEffect(() => {
    const currentVideo = videoRefs.current[videoIndex];

    if (isVideoOpen) {
      // Pausar timer
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Pausar video
      if (currentVideo) currentVideo.pause();

      // Pausar barra
      if (barTween.current) barTween.current.pause();
    } else {
      // Reanudar video
      if (currentVideo) currentVideo.play();

      if (barTween.current) {
        const remaining = (1 - barTween.current.progress()) * DURATION * 1000;

        // Reiniciar timer ajustado
        startTimer(remaining);

        // Reanudar barra
        barTween.current.resume();
      }
    }
  }, [isVideoOpen, videoIndex]);
  
  // Aniamcion de Titulo 
  useGSAP(() => {
    gsap.fromTo('#main-title', {
      y: '100%',
      skewY: 35,
    },
    {
      y: '0',
      skewY: 0,
      duration: 1,
      delay: 2
    })
  }, []);

  return (
    <Loader Children={
      <div className="h-[100dvh] w-full relative text-background">
        {isVideoOpen && <VideoPlayer handleIsOpen={toggleVideoOpen} videoIndex={videoIndex} isVideoOpen={isVideoOpen}></VideoPlayer> }
        <Header></Header>
        <div className="absolute z-10 w-full px-5 pb-5 pt-20 top-0 h-full md:h-fit">
          <div className="text-8xl flex flex-col md:flex-row justify-between font-bebas h-full md:h-fit">
            {words.map((el, i) => (
              <div key={i} className='w-full'>
                <div className={`overflow-hidden h-fit leading-[84%] ${i === 1 ? 'text-right' : ''}`}>
                  <div id="main-title" className="origin-bottom-left w-full">{el}</div>
                </div>
                {i === 0 ? (<p className="text-xs max-w-60 font-medium font-inter">{subTitlePage}</p>) : ''}
              </div>
            ))}
          </div>
        </div>
        <ul className="size-full relative">
          {projects.map((el, i) => (
            <li 
              key={i}
              id={`bg-video-${i}`} 
              className="absolute top-0 size-full cursor-pointer">
              <video
                  ref={(el) => {
                    if (el) videoRefs.current[i] = el;
                  }}
                  src={el.videoSrc}
                  onClick={toggleVideoOpen}
                  className="size-full object-cover"
                  autoPlay
                  muted
                  loop
                ></video>
            </li>
          ))}
        </ul>
        <div className="absolute top-1/2 -translate-y-1/2 z-20 gap-3 w-full p-5 text-xs flex md:hidden">
          <ul className="relative w-full">
            {
              projects.map((el, i) => (
                <article 
                    key={i}
                    id={`list-article-${i}`}
                    onClick={toggleVideoOpen}
                    className="min-w-52 cursor-pointer w-full absolute top-0">
                    <div className="my-4 flex flex-col">
                      <h2 className="uppercase font-medium">{el.title}</h2>
                      <p className="text-stone-400">{el.studio}</p>
                    </div>
                    <div className="relative w-full">
                      <div
                        ref={(el) => {
                          if (el) progressBarMobileRefs.current[i] = el;
                        }}
                        className="origin-left w-full h-[0.095rem] bg-background absolute z-10"
                    ></div>
                      <div className="w-full h-[0.095rem] bg-stone-600 absolute opacity-40"></div>
                    </div>
                  </article>
              ))
            }
          </ul>
        </div>
        <ul className="absolute bottom-0 translate-y-0 z-10 gap-3 m-5 text-xs hidden md:flex">
          {projects.map((el, i) => (
            <article 
              key={i}
              onClick={() => handleClick(i)} 
              className="min-w-52 cursor-pointer">
              <div className="my-4 flex flex-col">
                <h2 className="uppercase font-medium">{el.title}</h2>
                <p className="text-stone-400">{el.studio}</p>
              </div>
              <div className="relative w-full">
                <div
                   ref={(el) => {
                      if (el) progressBarDesktopRefs.current[i] = el;
                    }}
                  className="origin-left w-full h-[0.095rem] bg-background absolute z-10"
              ></div>
                <div className="w-full h-[0.095rem] bg-stone-600 absolute opacity-40"></div>
              </div>
            </article>
          ))}
        </ul>
      </div>
    }>
    </Loader>
  );
}
