"use client";

import React, { useState } from 'react';
import Lightbox from './lightbox';
import Image from 'next/image';

// Data for the tiled image gallery using the latest URLs
const galleryImages = [
  '/images/venue/CrescentHotelSpa_9703-scaled.jpg',
  '/images/venue/crescent-hotel-symbol-hospitality.jpg',
  '/images/venue/crescent-hotel-restoration.jpg',
  '/images/venue/W-H-Reid-Summer-House-Front-2-lg.jpg',
  '/images/venue/treetop-cottage-room.jpg',
  '/images/venue/Photo-May-13-2022-8-13-09-AM-scaled.jpg',
];

// Alt texts corresponding to the images (for the Lightbox component)
const galleryAlts = [
  'A view of the Fountain Garden wedding ceremony site.',
  'A beautiful window, plush armchair  and fireplace in one of the Crescent\'s suites.',
  'A historic photograph of the crescent.',
  'The W.H. Reid House private residence.',
  'A view of a beautiful bedroom within one of the suites.',
  'The Crescent Hotel pool.',
];


const VenueSection = () => {
  // State to control the visibility of the lightbox modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track which image is currently being displayed in the modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Opens the lightbox modal and sets the starting image index.
   * @param {number} index The index of the image clicked in the gallery.
   */
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  /** Closes the lightbox modal. */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /** Moves to the next image in the gallery, wrapping around to the start. */
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  /** Moves to the previous image in the gallery, wrapping around to the end. */
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const imageElements = [
    // Image 1 (Large 2x2) - Index 0 (Already Correct)
    <div 
      key={0} // ⬅️ The key should typically be on the outermost repeating element
      onClick={() => openModal(0)} 
      className="overflow-hidden relative col-span-2 row-span-2 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <Image 
        fill
        src={galleryImages[0]} 
        alt={galleryAlts[0]} 
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>,
    
    // Image 2 (Top Right 2x1) - Index 1
    <div 
      key={1} 
      onClick={() => openModal(1)} 
      className="overflow-hidden relative col-span-2 row-span-1 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <Image 
        fill
        src={galleryImages[1]} 
        alt={galleryAlts[1]} 
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>,
    
    // Image 3 (Middle Right 1x1) - Index 2
    <div 
      key={2} 
      onClick={() => openModal(2)} 
      className="overflow-hidden relative col-span-1 row-span-1 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <Image 
        fill
        src={galleryImages[2]} 
        alt={galleryAlts[2]} 
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 33vw, 16.5vw"
      />
    </div>,
    
    // Image 4 (Middle Right 1x1) - Index 3
    <div 
      key={3} 
      onClick={() => openModal(3)} 
      className="overflow-hidden relative col-span-1 row-span-1 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <Image 
        fill
        src={galleryImages[3]} 
        alt={galleryAlts[3]} 
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 33vw, 16.5vw"
      />
    </div>,
    
    // Image 5 (Bottom 2x1) - Index 4
    <div 
      key={4} 
      onClick={() => openModal(4)} 
      className="overflow-hidden relative col-span-2 row-span-1 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <Image 
        fill
        src={galleryImages[4]} 
        alt={galleryAlts[4]} 
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>,
    
    // Image 6 (Bottom 2x1) - Index 5
    <div 
      key={5} 
      onClick={() => openModal(5)} 
      className="overflow-hidden relative col-span-2 row-span-1 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
    >
      <Image 
        fill
        src={galleryImages[5]} 
        alt={galleryAlts[5]} 
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>,
  ];

  return (
    <>
      <section id="venue" className="">
        <div className="mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-12 font-serif text-[#f2df93]">The Venue</h2>
            
            {/* First Row: Text and Gallery */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="space-y-6 text-lg">
                <div className="w-auto relative">
                  <Image
                    width="84"
                    height="191"
                    src="/images/crescent-hotel-logo-white.png"
                    alt="Crescent Hotel Logo"
                    className=""
                  />
                </div>
                <h3 className="text-3xl font-bold font-serif text-[#f2df93]">The Crescent Hotel</h3>
                <p className="leading-relaxed">
                  Perched high above the Victorian Village of Eureka Springs, Arkansas is the Crescent Hotel & Spa, a palatial structure and resort hotel known widely in the Ozark Mountains as the “symbol of hospitality” for the State of Arkansas and brought to life year round.
                </p>
                <p className="leading-relaxed">
                  The Crescent hotel is beautiful, romantic, full of personality, and purportedly <strong>haunted</strong>! The hotel offers regular ghost tours, and has been consistently patrolled by a series of cats named Morris, who make sure to keep the spirits in line.
                </p>
                <p className="leading-relaxed">
                  Please feel free to stay at the Crescent during your trip to Eureka Springs to celebrate with us, but other hotels are available as well.
                </p>
                <div className="pt-4 border-t border-gray-700">
                  <p className="mb-2">
                    <a href="https://maps.app.goo.gl/s7D5DpiN4aonYXFR7" target="_blank" className="hover:text-indigo-400 transition block">
                      <span className="font-semibold text-[#f2df93]">Address:</span><br />
                      1886 Crescent Hotel & Spa<br />
                      75 Prospect Ave<br />
                      Eureka Springs, AR 72632
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-[#f2df93]">Contact:</span> <a href="tel:855-725-5720" className="hover:text-indigo-400 transition">855-725-5720</a>
                  </p>
                </div>
              </div>

              {/* Tiled Gallery with click handlers */}
              <div className="grid lg:grid-cols-4 lg:grid-rows-3 gap-3 h-[60rem] lg:h-full lg:aspect-square lg:aspect-auto">
                {imageElements}
              </div>
            </div>
            
            {/* Second Row: Google Map (Full Width) */}
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-[#f2df93] opacity-90 hover:opacity-100 transition duration-300">
              <iframe
                title="Google Maps - Crescent Hotel Venue"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3211.04697419977!2d-93.740069023456!3d36.40805877236151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ced2cc2a3d0915%3A0x84a0b5e5978a3c8b!2sCrescent%20Hotel%20and%20Spa!5e0!3m2!1sen!2sus!4v1711204099499!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
        </div>
      </section>

      {/* Lightbox Modal (Refactored to use the imported component) */}
      <Lightbox
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageUrl={galleryImages[currentImageIndex]}
        imageAlt={galleryAlts[currentImageIndex]}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </>
  );
};

export default VenueSection;
