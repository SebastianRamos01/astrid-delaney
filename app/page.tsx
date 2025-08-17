'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { projects, namePage, subTitlePage } from './data/mainData'
import { useEffect, useRef, useState } from "react";


export default function Home() {
  
  const DURATION = 6;
  const [videoIndex, setVideoIndex] = useState(0);
  const progressBarRefs = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const words = namePage.split(' ');

   // Timer para cambiar video
  useEffect(() => {
    // Función para iniciar el timer
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setVideoIndex((prev) =>
          prev === projects.length - 1 ? 0 : prev + 1
        );
      }, DURATION * 1000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Click del articulo
  const handleClick = (index: number) => {
    setVideoIndex(index);
    // Reiniciar el timer
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setVideoIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
    }, DURATION * 1000);
  };

  // Animación de barra
  useEffect(() => {
    const ctx = gsap.context(() => {
      progressBarRefs.current.forEach((bar, i) => {
        gsap.set(bar, { scaleX: i === videoIndex ? 0 : 1 });
      });

      gsap.fromTo(
        progressBarRefs.current[videoIndex],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DURATION,
          ease: "linear"
        }
      );
    });
    return () => ctx.revert();
  }, [videoIndex]);

  // Animación de videos
  useEffect(() => {
    projects.forEach((_, i) => {
      gsap.to(`#bg-video-${i}`, {
        opacity: i === videoIndex ? 1 : 0,
        duration: 1,
        ease: "power2.out",
      });
    });
  }, [videoIndex]);
  
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
      <div className="h-screen w-full relative text-background">
        <Header></Header>
        <div className="absolute z-10 w-full px-5 pb-5 pt-20 top-0 h-full">
          <div className="text-9xl flex flex-col md:flex-row justify-between font-bebas h-full md:h-fit">
            {words.map((el, i) => (
              <div key={i}>
                <div className={`overflow-hidden h-fit leading-[84%] ${i === 1 ? 'text-right' : ''}`}>
                  <div id="main-title" className="origin-bottom-left">{el}</div>
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
              className="absolute top-0 size-full">
              <video 
                className='object-cover size-full' 
                src={el.videoSrc}
                autoPlay
                muted
                loop
              ></video>
            </li>
          ))}
        </ul>
        <ul className="absolute bottom-1/2 translate-y-1/2 md:bottom-0 md:translate-y-0 z-10 flex gap-3 m-5 text-xs">
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
                  ref={(div) => { progressBarRefs.current[i] = div!; }}
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
