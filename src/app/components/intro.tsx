import React, { useState, useRef, useEffect } from 'react';
import { initBackgroundAnimation } from '../lib/background-animation.js';
import Image from 'next/image'

const IntroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starImagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load star images from their original source files
  useEffect(() => {
    const NativeImage = window.Image;
    const starImagePromises = [];

    for (let i = 1; i <= 10; i++) {
      starImagePromises.push(
        new Promise<HTMLImageElement | null>((resolve) => {
          const img = new NativeImage(); // <--- Use the alias here
          img.src = `/images/stars/star_${i}.svg`;
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load star image: /images/stars/star_${i}.svg`);
            resolve(null);
          };
        })
      );
    }

    Promise.all(starImagePromises).then((images) => {
      starImagesRef.current = images.filter(img => img !== null) as HTMLImageElement[];
      setIsReady(true);
    });
  }, []);

  // Use the new utility function to handle the background animation logic
  useEffect(() => {
    if (isReady && canvasRef.current) {
      return initBackgroundAnimation(canvasRef.current, starImagesRef.current);
    }
  }, [isReady]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-[#121a2eff] text-[#f7fbfc] p-4 z-1 overflow-hidden background-gradient">
      <canvas ref={canvasRef} className="absolute inset-0 z-1"></canvas>
      <div className="intro-content-container z-10 max-w-2xl mx-auto space-y-6">
        <h1 className="relative w-full z-2">
          <Image
            width="478"
            height="234"
            src="/images/wedding-logo-reverse.svg"
            alt="Taylor & Tyler"
            className="w-full h-auto mx-auto max-w-[600px]"
          />
        </h1>
        <p className="relative text-lg font-light z-2">Please join us in celebrating the marriage of</p>
        <p className="relative text-xl font-light z-2">
          Taylor Nicole Phillips &<br />
          Tyler Andrew Rivers
        </p>
        <p className="relative text-lg font-light z-2">on November 6<sup>th</sup>, 2025</p>
        <a href="#rsvp" className="relative text-2xl bg-white text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 z-2 inline-flex items-center">RSVP</a>
      </div>
    </section>
  );
};

export default IntroSection;