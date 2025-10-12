"use client";

import React from 'react';

interface LightboxProps {
  // Flag to determine if the modal is visible
  isOpen: boolean;
  // URL of the image to display
  imageUrl: string;
  // Alt text for accessibility
  imageAlt: string;
  // Function to close the modal
  closeModal: () => void;
  // Function to navigate to the next image
  nextImage: () => void;
  // Function to navigate to the previous image
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
  if (!isOpen) {
    return null;
  }

  // Effect to handle keyboard controls (Escape, Left/Right arrows)
  React.useEffect(() => {
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, nextImage, prevImage]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={closeModal} // Close when clicking the backdrop
    >
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition z-50"
        title="Close (Escape)"
      >
        &times;
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => { e.stopPropagation(); prevImage(); }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition z-50"
        title="Previous (Left Arrow)"
      >
        &#10094;
      </button>

      {/* Image Container */}
      <div 
        className="max-w-full max-h-full flex justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
      >
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Next Button */}
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
