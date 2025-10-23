"use client";

import React, { useState } from 'react';

const TimelineSection = () => {
  const [openEventIndex, setOpenEventIndex] = useState<number | null>(0);
  const [openPreEventIndex, setOpenPreEventIndex] = useState<number | null>(0);

  const events = [
    {
      time: 'Ceremony',
      title: 'Ceremony',
      description: 'An intimate private ceremony will be held at Lovers\' Leap - if you don\'t hear from us, you get to skip this and show up at the party at 6:00pm!',
    },
    {
      time: '6:00 PM',
      title: 'Cocktail Hour',
      description: 'Enjoy refreshing cocktails and light hors d\'oeuvres while the wedding party arrives from the ceremony site. This is a great time to mingle and get to know other guests!',
    },
    {
      time: '6:30 PM',
      title: 'Announcement',
      description: 'We will arrive during the cocktail hour and be officially announced together. We are a big deal.',
    },
    {
      time: '7:00 PM',
      title: 'Dinner',
      description: 'Join us for a beautiful meal, toasts and lots of clinking glasses.',
    },
    {
      time: '8:00 PM',
      title: 'Reception',
      description: 'Dancing, bouquet tossing, all the good stuff.',
    },
    {
      time: '10:00 PM',
      title: 'End of Reception',
      description: 'Time to either go home, or extend the party elsewhere!',
    },
  ];

  const preEvents = [
    {
      time: '11/5 - 6:30pm',
      title: 'Rehearsal Dinner',
      description: 'The \"wedding party\" will gather for dinner.',
    },
    {
      time: '11/5 - TBD',
      title: 'Crescent Ghost Tour',
      description: 'In Eureka Springs early for some R&R? Come get spooked with us at the Crescent Hotel at 8pm for their famous ghost tour!',
    }
  ];

  const toggleDrawer = (index: number) => {
    setOpenEventIndex(openEventIndex === index ? null : index);
  };
  
  const togglePreDrawer = (index: number) => {
    setOpenPreEventIndex(openPreEventIndex === index ? null : index);
  };

  return (
    <section id="timeline" className="">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 font-serif text-[#f2df93ff]">What to Expect</h2>
        <h3 className="text-2xl text-center mb-6 font-serif text-[#f2df93ff]">Pre-wedding</h3>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Here is a short list of what we&apos;re planning for days ahead of the wedding:
        </p>

        {/* PRE-WEDDING TIMELINE: Uses openPreEventIndex and togglePreDrawer */}
        <div className="max-w-xl mx-auto mb-12">
          {preEvents.map((event, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                onClick={() => togglePreDrawer(index)} // ⬅️ Call the new handler
              >
                <span className="text-xl font-bold text-[#f2df93ff] flex-shrink-0">{event.time}</span>
                <img 
                  src={'../images/stars/star_2.svg'} 
                  alt="A small star" 
                  style={{ objectFit: 'cover' }}
                  className=""
                />
                <h3 className="text-xl font-semibold text-gray-200 flex-grow">{event.title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transform transition-transform duration-300 text-white ${openPreEventIndex === index ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openPreEventIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden bg-gray-900 rounded-b-lg text-gray-300 p-4 pt-0">
                  <p className="mt-4">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl text-center mb-12 font-serif text-[#f2df93ff]">Wedding Day</h3>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          We&apos;ve planned a day full of love and celebration, and we can&apos;t wait to share it with you. Here is a brief look at the day&apos;s events.
        </p>

        {/* WEDDING DAY TIMELINE: Uses openEventIndex and toggleDrawer (Original) */}
        <div className="max-w-xl mx-auto">
          {events.map((event, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                onClick={() => toggleDrawer(index)}
              >
                <span className="text-xl font-bold text-[#f2df93ff] flex-shrink-0">{event.time}</span>
                <img 
                  src={'../images/stars/star_2.svg'} 
                  alt="A small star" 
                  style={{ objectFit: 'cover' }}
                  className=""
                />
                <h3 className="text-xl font-semibold text-gray-200 flex-grow">{event.title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transform transition-transform duration-300 text-white ${openEventIndex === index ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openEventIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden bg-gray-900 rounded-b-lg text-gray-300 p-4 pt-0">
                  <p className="mt-4">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;