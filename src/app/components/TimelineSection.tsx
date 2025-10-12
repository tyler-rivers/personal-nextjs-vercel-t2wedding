"use client";

import React, { useState } from 'react';

const TimelineSection = () => {
  const [openEventIndex, setOpenEventIndex] = useState<number | null>(0);

  const events = [
    {
      time: 'Ceremony',
      title: 'Ceremony',
      description: 'An intimate private ceremony will be held at Lovers\' Leap - if you don\'t hear from us, you get skip this and show up at the party at 6:00pm!',
    },
    {
      time: '6:00 PM',
      title: 'Cocktail Hour',
      description: 'Enjoy refreshing cocktails and light hors d\'oeuvres while the wedding party takes photographs. This is a great time to mingle and get to know other guests!',
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

  const toggleDrawer = (index: number) => {
    setOpenEventIndex(openEventIndex === index ? null : index);
  };

  return (
    <section id="timeline" className="rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 font-horley text-[#f2df93ff]">What to Expect</h2>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
        We've planned a day full of love and celebration, and we can't wait to share it with you. Here is a brief look at the day's events.
      </p>

      <div className="max-w-xl mx-auto">
        {events.map((event, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() => toggleDrawer(index)}
            >
              <span className="text-xl font-bold text-[#f2df93ff] flex-shrink-0">{event.time}</span>
              <svg className="w-5 h-5 text-[#f2df93ff]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.37 2.45c-.412.3-.598.831-.225 1.348l1.286 3.96c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.784.57-1.838-.197-1.54-1.118l1.286-3.96c.373-.517.187-1.048-.225-1.348l-3.37-2.45c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-200 flex-grow">{event.title}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transform transition-transform duration-300 text-white ${openEventIndex === index ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openEventIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden bg-gray-800 rounded-lg text-gray-200 p-4">
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
