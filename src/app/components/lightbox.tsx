"use client";

import React from 'react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  imageAlt: string;
  closeModal: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ 
  isOpen, 
  imageUrl, 
  imageAlt, 
  closeModal, 
  nextImage, 
  prevImage 
}) => {
  // Effect to handle keyboard controls (Escape, Left/Right arrows)
  React.useEffect(() => {
    // Only set up the event listener if the modal is open
    if (!isOpen) {
      return; // Skip setting up the listener if closed
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function to remove the listener when the modal closes or component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
    // Include all state/prop dependencies, including isOpen, in the dependency array
  }, [isOpen, closeModal, nextImage, prevImage]);

  // The conditional return is now safe because the hook was called unconditionally above.
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={closeModal} // Close when clicking the backdrop
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition z-50"
        title="Close (Escape)"
      >
        &times;
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prevImage(); }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition z-50"
        title="Previous (Left Arrow)"
      >
        &#10094;
      </button>

      <div 
        className="relative max-w-full max-h-full h-full w-full flex justify-center items-center" 
        onClick={(e) => e.stopPropagation()} 
      >
        <Image 
          fill 
          style={{ objectFit: 'contain' }}
          src={imageUrl} 
          alt={imageAlt} 
          priority={true}
          className="rounded-lg shadow-2xl" 
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); nextImage(); }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-5xl p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition z-50"
        title="Next (Right Arrow)"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Lightbox;