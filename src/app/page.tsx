"use client";

import React, { useState } from 'react';
import FadeInOnScroll from './components/FadeInOnScroll';
import IntroSection from './components/intro';
// import FormSection from './components/rsvpForm';
import SimpleContactForm from './components/saveDateForm';
import VenueSection from './components/venue';
import TownSection from './components/town';
import TimelineSection from './components/timeline';
import RegistrySection from './components/registry';
import FooterSection from './components/footer';

const Page = () => {
  // const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  // const [rsvpForm, setRsvpForm] = useState<RsvpFormType>({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
    <div className="bg-[#121a2eff] text-[#f7fbfc] font-horley antialiased">
      {/* Custom font-face rule to load the custom font from the public directory. */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @font-face {
          font-family: 'Horley Old Style';
          src: url('/fonts/HorleyOldStyleMTStd.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        .font-horley {
          font-family: 'Horley Old Style', serif;
        }
        --text-lg = 18px;
        --text-base = 14px;
        .background-gradient::after {
          content: '';
          width: 100%;
          height: 100%;
          filter: contrast(130%) brightness(200%);
          background: 
          linear-gradient(0deg, rgba(0,0,255,0), rgba(0,0,0,100)),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          position: absolute;
          left: 0;
          top: 0;
          mix-blend-mode: multiply;
          opacity: 25%;
          z-index: 0;
        }
        .intro-content-container {
          position: relative;
          z-index: 1;
        }
        .intro-content-container::after {
          content: '';
          position: absolute;
          top: -24px;
          left: -24px;
          border-radius: 8px;
          background-color: #121a2eff;
          z-index: 1;
          width: calc(100% + 48px);
          height: calc(100% + 48px);
          opacity: .75;
          filter: blur(1.5rem);
        }
        .border-celestial {
          border-width: 2px;
          border-color: #f2df93;
          outline: 1px solid white;
          outline-offset: -7px;
          position: relative;
        }
        .top-star::after {
          content: url('../images/stars/star_cards.svg');
          object-fit: contain;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      `}</style>

      {/* Custom Alert Message Box */}
      {isAlertVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center max-w-sm">
            <h3 className="text-xl font-bold font-horley mb-4 text-[#f2df93ff]">Thank you!</h3>
            <p className="mb-6">Your RSVP has been submitted. We can&apos;t wait to celebrate with you!</p>
            <button
              onClick={() => setIsAlertVisible(false)}
              className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <FadeInOnScroll>
        <IntroSection />
      </FadeInOnScroll>

      <main className="container mx-auto p-6 md:p-12 space-y-16 z-2">
        {/* <FadeInOnScroll>
          <FormSection
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
            rsvpForm={rsvpForm}
            setRsvpForm={setRsvpForm}
            setIsAlertVisible={setIsAlertVisible}
          />
        </FadeInOnScroll> */}
        <FadeInOnScroll>
          <SimpleContactForm />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <VenueSection />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <TownSection />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <TimelineSection />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <RegistrySection />
        </FadeInOnScroll>
      </main>

      <FooterSection />
    </div>
  );
};

export default Page;