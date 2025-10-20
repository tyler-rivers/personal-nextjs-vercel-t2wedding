"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';

interface Guest {
  name: string;
  isCouple?: boolean;
  isFamily?: boolean;
  isSingle?: boolean
  plusOneAllowed?: boolean;
  attending: string[];
}

interface RsvpPerson {
  attending: boolean;
  food: string;
  allergies: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
}

interface RsvpFormType {
  [guestName: string]: {
    [personName: string]: RsvpPerson;
  };
}

// Data definitions provided in user context
export const guestsData: Guest[] = [
  { "name": "Leah & Donald Bean", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Leah Bean", "Donald Bean"] },
  { "name": "Shanna & Nick Buitron", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Shanna Buitron", "Nick Buitron"] },
  { "name": "Chris & Christy Christofferson", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Chris Christofferson", "Christy Christofferson"] },
  { "name": "Bethann Coldiron & Tyler Brantley", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Bethann Coldiron", "Tyler Brantley"] },
  { "name": "Helen Cox & Austin Jewel", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Helen Cox", "Austin Jewel"] },
  { "name": "Jessica Deckard", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": true, "attending": ["Jessica Deckard"] },
  { "name": "Jessica Evans", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": true, "attending": ["Jessica Evans"] },
  { "name": "Lauren & Jonathan Hoover", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Lauren Hoover", "Jonathan Hoover"] },
  { "name": "Corina Mendoza", "isCouple": false, "isFamily": false, "isSingle": false, "plusOneAllowed": true, "attending": ["Corina Mendoza"] },
  { "name": "John Mueller & Christina Gullo", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["John Mueller", "Christina Gullo"] },
  { "name": "Ronald Novotny & Rene DeShazer", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Ronald Novotny", "Rene DeShazer"] },
  { "name": "Susanne Novotny & Ryan Seitz", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Susanne Novotny", "Ryan Seitz"] },
  { "name": "Sean O'Kane", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": false, "attending": ["Sean O'Kane"] },
  { "name": "The Phillips Family", "isCouple": false, "isFamily": true, "isSingle": false, "plusOneAllowed": false, "attending": ["Scot Phillips", "Patricia Phillips", "Mark Phillips"] },
  { "name": "Alice Phoenix", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": true, "attending": ["Alice Phoenix"] },
  { "name": "Beth & Patrick Purvis", "isCouple": false, "isFamily": true, "isSingle": false, "plusOneAllowed": false, "attending": ["Beth Purvis", "Patrick Purvis"] },
  { "name": "Daniel & Janet Rivers", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Daniel Rivers", "Janet Rivers"] },
  { "name": "Justin & Marielle Rivers", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Justin Rivers", "Marielle Rivers"] },
  { "name": "Trish & Chuck Safkin", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Trish Safkin", "Chuck Safkin"] },
  { "name": "Mollie Shin", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": true, "attending": ["Mollie Shin"] },
  { "name": "Samantha Synett", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": true, "attending": ["Samantha Synett"] },
  { "name": "Caleb & Alyssa Warner", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Caleb Warner", "Alyssa Warner"] },
  { "name": "Brenda & Jay Toms", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Brenda Toms", "Jay Toms"] },
  { "name": "Tiffany & Ian Hadden", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Tiffany Hadden", "Ian Hadden"] },
  { "name": "Patrick Mueller", "isCouple": false, "isFamily": false, "isSingle": true, "plusOneAllowed": false, "attending": ["Patrick Mueller"] },
  { "name": "Shannon & Justin Bassett", "isCouple": true, "isFamily": false, "isSingle": false, "plusOneAllowed": false, "attending": ["Shannon Bassett", "Justin Bassett"] }
];

export const foodOptions: string[] = [
  "Chicken",
  "Beef",
  "Fish",
  "Vegetarian",
  "Vegan"
];

// --- HCaptcha Component Implementation ---

const HCAPTCHA_SITEKEY = "e704814c-d75c-4cfe-93ca-135a3380318c"; // IMPORTANT: Replace with your actual site key
const HCAPTCHA_SCRIPT_URL = "https://js.hcaptcha.com/1/api.js";

interface HCaptchaProps {
    onVerify: (token: string) => void;
    onError: () => void;
}

// Define a type for the hCaptcha API methods we use
interface HCaptchaApi {
    render: (container: HTMLElement, options: object) => string | number;
    reset: (widgetId?: string | number) => void;
    remove: (widgetId: string | number) => void;
}

// Extend Window interface to include hcaptcha global object safely
declare global {
    interface Window {
        hcaptcha: HCaptchaApi;
    }
}

const HCaptchaComponent: React.FC<HCaptchaProps> = ({ onVerify, onError }) => {
    const captchaRef = useRef<HTMLDivElement>(null);
    // Ref to store the ID returned by hcaptcha.render()
    const widgetIdRef = useRef<string | number | null>(null);

    // Effect to handle script loading and widget initialization
    useEffect(() => {
        let script: HTMLScriptElement | null = null;
        
        const initializeCaptcha = () => {
            // Check for existence and then use the defined type
            const hcaptchaApi = window.hcaptcha;

            if (captchaRef.current && hcaptchaApi) {
                try {
                    widgetIdRef.current = hcaptchaApi.render(captchaRef.current, {
                        sitekey: HCAPTCHA_SITEKEY,
                        'callback': onVerify,
                        'error-callback': onError,
                    });
                } catch (e) {
                    console.error("HCaptcha render failed:", e);
                    onError();
                }
            }
        };

        // If the script isn't loaded, load it
        if (typeof window.hcaptcha === 'undefined') {
            script = document.createElement('script');
            script.src = HCAPTCHA_SCRIPT_URL;
            script.async = true;
            script.defer = true;
            script.onload = initializeCaptcha;
            document.head.appendChild(script);
        } else {
            // If it's already loaded (e.g., component remounts), initialize immediately
            initializeCaptcha();
        }

        // Cleanup function for hCaptcha widget and script
        return () => {
            const hcaptchaApi = window.hcaptcha;

            if (widgetIdRef.current !== null && hcaptchaApi && hcaptchaApi.remove) {
                try {
                    hcaptchaApi.remove(widgetIdRef.current);
                    widgetIdRef.current = null; // Clear the ref after removal
                } catch (e) {
                    console.error("Failed to remove hCaptcha widget:", e);
                }
            }
            // Optional: Script removal logic (omitted for simplicity in this context)
        };

    // Dependencies are empty because we only want to run this once on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={captchaRef} className="flex justify-center">
            {/* HCaptcha will render here */}
        </div>
    );
};

// --- FormSection Component ---

interface FormSectionProps {
  selectedGuest: Guest | null;
  setSelectedGuest: (guest: Guest | null) => void;
  rsvpForm: RsvpFormType;
  // 🌟 FIX 1: Use React.Dispatch<React.SetStateAction<T>> for the state setter prop
  setRsvpForm: React.Dispatch<React.SetStateAction<RsvpFormType>>;
  setIsAlertVisible: (visible: boolean) => void;
}


const FormSection: React.FC<FormSectionProps> = ({
  selectedGuest,
  setSelectedGuest,
  rsvpForm,
  setRsvpForm,
  setIsAlertVisible,
}) => {

  // State for the hCaptcha token and any submission error
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, person: string, field: keyof RsvpPerson) => {
    const { value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // 🌟 FIX 2: Guard clause instead of unsafe non-null assertion on optional chain
    if (!selectedGuest?.name) return;

    // 🌟 FIX 3: Remove explicit type cast from the functional update, which is now
    // correctly inferred by the updated setRsvpForm prop type (FIX 1).
    setRsvpForm(prevForm => ({
      ...prevForm,
      // selectedGuest.name is safe due to guard clause
      [selectedGuest.name]: {
        ...prevForm[selectedGuest.name],
        [person]: {
          // Non-null assertion removed, relying on optional chaining fallback/default initialization
          ...prevForm[selectedGuest.name]?.[person],
          [field]: type === 'checkbox' ? checked : value,
        },
      },
    }));
  };

  const handleGuestSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const guestName = e.target.value;
    const guest = guestsData.find(g => g.name === guestName);
    setSelectedGuest(guest || null);
    
    // Reset captcha and errors when the guest group changes
    setCaptchaToken(null);
    setCaptchaError(null);

    if (guest && !rsvpForm[guest.name]) {
      const initialRsvp: { [key: string]: RsvpPerson } = {};
      guest.attending.forEach(person => {
        initialRsvp[person] = { attending: true, food: '', allergies: '', email: '', phone: '' };
      });
      if (guest.plusOneAllowed) {
        initialRsvp['Plus One'] = { attending: false, food: '', allergies: '', email: '', phone: '', firstName: '', lastName: '' };
      }
      setRsvpForm(prevForm => ({
        ...prevForm,
        [guest.name]: initialRsvp,
      }));
    }
  };

  const handlePlusOneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!selectedGuest) return;

    if (checked) {
      setRsvpForm(prevForm => ({
        ...prevForm,
        [selectedGuest.name]: {
          ...prevForm[selectedGuest.name],
          'Plus One': { attending: true, food: '', allergies: '', email: '', phone: '', firstName: '', lastName: '' },
        },
      }));
    } else {
      setRsvpForm(prevForm => {
        const newRsvp = { ...prevForm[selectedGuest.name] };
        delete newRsvp['Plus One'];
        return {
          ...prevForm,
          [selectedGuest.name]: newRsvp,
        };
      });
    }
  };

  // Update handleSubmit to check for the captcha token
  const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!selectedGuest) return;
      
      if (!captchaToken) {
          setCaptchaError("Please complete the security check before submitting.");
          
          const hcaptchaApi = window.hcaptcha;
          if (hcaptchaApi && hcaptchaApi.reset) {
             hcaptchaApi.reset();
          }
          return;
      }

      setCaptchaError(null);
      // Logic for submitting the RSVP (e.g., API call)
      console.log("Form Submitted:", rsvpForm[selectedGuest.name], "Captcha Token:", captchaToken);
      setIsAlertVisible(true);
  };

  // Handlers for HCaptcha verification and errors
  const handleVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  };

  const handleError = () => {
    setCaptchaToken(null);
    setCaptchaError("Captcha failed to load or verify. Please try refreshing the page.");
  };

  return (
    <section id="rsvp" className="">
      <h2 className="text-3xl font-bold text-center mb-8 font-horley text-[#f2df93ff]">Kindly RSVP</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 bg-gray-900 p-8 rounded shadow-lg">
        <div>
          <label htmlFor="guestName" className="block text-sm font-medium text-gray-300 mb-2">Select your name</label>
          <select
            id="guestName"
            name="guestName"
            className="w-full p-3 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-[#f7fbfc]"
            onChange={handleGuestSelect}
            required
          >
            <option className="bg-gray-800 text-[#f7fbfc]" value="">-- Please select a name --</option>
            {guestsData.map((guest, index) => (
              <option className="bg-gray-800 text-[#f7fbfc]" key={index} value={guest.name}>{guest.name}</option>
            ))}
          </select>
        </div>

        {selectedGuest && (
          <div className="space-y-8">
            {/* Attending Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGuest.attending.map((person, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-800 p-4 rounded border border-gray-700">
                  <input
                    type="checkbox"
                    id={person.replace(/\s/g, "")}
                    name={person}
                    checked={rsvpForm[selectedGuest.name]?.[person]?.attending || false}
                    onChange={(e) => handleInputChange(e, person, 'attending')}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={person.replace(/\s/g, "")} className="text-sm font-medium text-gray-300">{person} is attending</label>
                </div>
              ))}
              {selectedGuest.plusOneAllowed && (
                <div className="flex items-center space-x-2 bg-gray-800 p-4 rounded border border-gray-700">
                  <input
                    type="checkbox"
                    id="plusOne"
                    name="plusOne"
                    checked={rsvpForm[selectedGuest.name]?.['Plus One']?.attending || false} 
                    onChange={handlePlusOneChange}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="plusOne" className="text-sm font-medium text-gray-300">Plus One</label>
                </div>
              )}
            </div>

            {/* Individual/Plus One Fields */}
            <div className="space-y-8">
              {Object.keys(rsvpForm[selectedGuest.name] || {}).map((person, index) => (
                (rsvpForm[selectedGuest.name][person]?.attending) && (
                  <div key={index} className="p-6 bg-gray-800 rounded shadow-inner space-y-4">
                    <h4 className="text-lg font-bold font-horley text-[#f2df93ff]">{person}</h4>
                    {person === 'Plus One' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                          value={rsvpForm[selectedGuest.name]?.[person]?.firstName || ''}
                          onChange={(e) => handleInputChange(e, person, 'firstName')}
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                          value={rsvpForm[selectedGuest.name]?.[person]?.lastName || ''}
                          onChange={(e) => handleInputChange(e, person, 'lastName')}
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${person}-food`} className="block text-xs font-medium text-gray-400 mb-1">Food Selection</label>
                        <select
                          id={`${person}-food`}
                          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc]"
                          value={rsvpForm[selectedGuest.name]?.[person]?.food || ''}
                          onChange={(e) => handleInputChange(e, person, 'food')}
                        >
                          <option className="bg-gray-800 text-[#f7fbfc]" value="">-- Select an option --</option>
                          {foodOptions.map((food, foodIndex) => (
                            <option className="bg-gray-800 text-[#f7fbfc]" key={foodIndex} value={food}>{food}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`${person}-allergies`} className="block text-xs font-medium text-gray-400 mb-1">Allergies</label>
                        <textarea
                          id={`${person}-allergies`}
                          rows={1}
                          placeholder="e.g., Peanuts, dairy..."
                          className="w-full p-3 border border-gray-700 rounded resize-none bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                          value={rsvpForm[selectedGuest.name]?.[person]?.allergies || ''}
                          onChange={(e) => handleInputChange(e, person, 'allergies')}
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`${person}-email`} className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        id={`${person}-email`}
                        placeholder="you@example.com"
                        className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                        value={rsvpForm[selectedGuest.name]?.[person]?.email || ''}
                        onChange={(e) => handleInputChange(e, person, 'email')}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${person}-phone`} className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id={`${person}-phone`}
                        placeholder="555-555-5555"
                        className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-[#f7fbfc] placeholder:text-gray-500"
                        value={rsvpForm[selectedGuest.name]?.[person]?.phone || ''}
                        onChange={(e) => handleInputChange(e, person, 'phone')}
                      />
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* HCaptcha Implementation */}
            <div className="space-y-4">
              <HCaptchaComponent onVerify={handleVerify} onError={handleError} />
              {captchaError && (
                  <p className="text-sm font-medium text-red-500 text-center">{captchaError}</p>
              )}
              {!captchaToken && !captchaError && (
                  <p className="text-sm text-gray-500 text-center">Please complete the security check above.</p>
              )}
              {captchaToken && (
                  <p className="text-sm text-green-500 text-center font-semibold">Security check complete!</p>
              )}
            </div>

            <button type="submit" className={`w-full font-semibold py-3 px-4 rounded-md transition duration-300 ${captchaToken ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`} disabled={!captchaToken}>
                Submit RSVP
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default FormSection;