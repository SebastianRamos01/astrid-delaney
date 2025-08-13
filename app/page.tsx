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
  const words = namePage.split(' ');

   // Timer para cambiar video
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
    }, DURATION * 1000);

    return () => clearInterval(interval);
  }, []);

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
        <div className="absolute z-10 w-full p-5 top-20">
          <p id="title" className="text-9xl flex justify-between font-bebas leading-[84%] overflow-hidden">
            {words.map((el, i) => (
            <span key={i} id="main-title" className="origin-bottom-left">{el}</span>
            ))}
          </p>
          <p className="text-xs max-w-60 font-medium">{subTitlePage}</p>
        </div>
        <ul className="size-full relative">
          {projects.map((el, i) => (
            <li 
              key={i}
              id={`bg-video-${i}`} 
              className="absolute top-0 size-full object-cover">
              <video 
                className='' 
                src={el.videoSrc}
                autoPlay
                muted
                loop
              ></video>
            </li>
          ))}
        </ul>
        <ul className="absolute bottom-0 z-10 flex gap-3 m-5 text-xs">
          {projects.map((el, i) => (
            <article key={i} className="min-w-52 cursor-pointer">
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
