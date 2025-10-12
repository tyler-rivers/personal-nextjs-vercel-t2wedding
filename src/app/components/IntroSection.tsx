import React, { useState, useRef, useEffect } from 'react';
import { initBackgroundAnimation } from '../lib/background-animation.js'; 

const IntroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starImagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load star images from their original source files
  useEffect(() => {
    const starImagePromises = [];

    for (let i = 1; i <= 10; i++) {
      starImagePromises.push(
        new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
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
      <div className="z-10 max-w-2xl mx-auto space-y-6">
        <h1 className="w-full z-2">
          <img
            src="/images/wedding-logo-reverse.svg"
            alt="Taylor & Tyler"
            className="w-full h-auto mx-auto max-w-[600px]"
          />
        </h1>
        <p className="text-lg font-light z-2">Please join us in celebrating the marriage of</p>
        <p className="text-xl font-light z-2">
          Taylor Nicole Phillips &<br />
          Tyler Andrew Rivers
        </p>
        <p className="text-lg font-light z-2">on November 6<sup>th</sup>, 2025</p>
        <a href="#rsvp" className="text-2xl bg-white text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 z-2">RSVP</a>
      </div>
    </section>
  );
};

export default IntroSection;