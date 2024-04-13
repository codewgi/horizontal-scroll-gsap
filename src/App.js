import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

function App() {
  const imageRef = useRef([]);
  const imageContainerRef = useRef([]);

  let imageSection = [];
  for(let i = 1; i <= 7; i++) {
    imageSection.push(
      <div className='w-[100vh] shrink-0 rounded-3xl overflow-hidden' ref={(ref) => imageRef.current[i-1] = ref}>
        <img src={`/img/${i}.jpg`} className='w-full'/>
      </div>
    );
  }
  
  // gsap
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    gsap.to(imageRef.current, {
      xPercent : -100 * (imageRef.current.length - 1),
      ease : 'none',
      scrollTrigger : {
        trigger : imageContainerRef.current,
        scrub : 1,
        end : '+=' + imageContainerRef.current.offsetWidth,
        pin : true,
        snap : 1 / (imageRef.current - 1)
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  // lenis
  const lenis = new Lenis();
  lenis.on('scroll', () => {});

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (
    <main className="bg-[#101010] w-full overflow-x-hidden">
      <section className='min-h-screen flex justify-center items-center'>
        <h1 className='font-bold text-8xl text-white'>Scroll down</h1>
      </section>
      <section className="min-h-screen w-full flex flex-nowrap items-center space-x-10 px-auto" ref={imageContainerRef} style={{ width : `calc(100vw * 6)` }}>
        {imageSection}
      </section>
      <section className='min-h-screen'></section>
    </main>
  );
}

export default App;
