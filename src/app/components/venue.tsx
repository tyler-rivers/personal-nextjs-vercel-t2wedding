"use client";

import React from 'react';

// Data for the tiled image gallery, combining src, alt, and grid layout span
const galleryItems = [
  { 
    src: '/images/venue/CrescentHotelSpa_9703-scaled.jpg', 
    alt: 'A view of the Fountain Garden wedding ceremony site.', 
    span: 'col-span-2 row-span-2' // Large 2x2 tile
  },
  { 
    src: '/images/venue/crescent-hotel-symbol-hospitality.jpg', 
    alt: 'A beautiful window, plush armchair and fireplace in one of the Crescent\'s suites.', 
    span: 'col-span-2 row-span-1' // Top Right 2x1 tile
  },
  { 
    src: '/images/venue/crescent-hotel-restoration.jpg', 
    alt: 'A historic photograph of the crescent.', 
    span: 'col-span-1 row-span-1' // Middle Right 1x1 tile
  },
  { 
    src: '/images/venue/W-H-Reid-Summer-House-Front-2-lg.jpg', 
    alt: 'The W.H. Reid House private residence.', 
    span: 'col-span-1 row-span-1' // Middle Right 1x1 tile
  },
  { 
    src: '/images/venue/treetop-cottage-room.jpg', 
    alt: 'A view of a beautiful bedroom within one of the suites.', 
    span: 'col-span-2 row-span-1' // Bottom 2x1 tile
  },
  { 
    src: '/images/venue/Photo-May-13-2022-8-13-09-AM-scaled.jpg', 
    alt: 'The Crescent Hotel pool.', 
    span: 'col-span-2 row-span-1' // Bottom 2x1 tile
  },
];

const VenueSection = () => {

  // Dynamically generate image elements from the combined data array
  const imageElements = galleryItems.map((item, index) => {    
    const className = `overflow-hidden relative ${item.span} rounded-xl shadow-2xl transition duration-300 hover:scale-[1.02] cursor-default`; // Removed cursor-pointer

    return (
      <div 
        key={index}
        // Removed onClick handler since there is no lightbox
        className={className}
      >
        <img 
          src={item.src} 
          alt={item.alt} 
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  });

  return (
    <section id="venue" className="text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12 font-serif text-[#f2df93]">The Venue</h2>
          
          {/* First Row: Text and Gallery */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6 text-lg">
              <div className="w-auto relative mb-6">
                <img
                  src="/images/crescent-hotel-logo-white.png"
                  alt="Crescent Hotel Logo"
                  className="max-h-24 w-auto" 
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
                Please feel free to stay at the Crescent during your trip to Eureka Springs to celebrate with us, but other hotels are available as well. To check on group rates, <a href="tel:855-725-5720">Call the Crescent</a> and inquire about the Rivers/Phillips wedding.
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

            {/* Tiled Gallery */}
            <div className="grid lg:grid-cols-4 lg:grid-rows-3 gap-3 h-[60rem] lg:h-full lg:aspect-square lg:aspect-auto">
              {imageElements}
            </div>
          </div>
          
          {/* Second Row: Google Map (Full Width) */}
          <div className="w-full h-96 shadow-2xl border-4 border-celestial opacity-90 hover:opacity-100 transition duration-300">
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
  );
};

export default VenueSection;
