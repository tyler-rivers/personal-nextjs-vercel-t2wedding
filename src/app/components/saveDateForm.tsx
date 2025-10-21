"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';

// Define a type for the hCaptcha API methods we use
interface HCaptchaApi {
    render: (container: HTMLElement, options: object) => string | number;
    reset: (widgetId?: string | number) => void;
    remove: (widgetId: string | number) => void;
}

// --- HCaptcha Configuration & Component ---
const HCAPTCHA_SITEKEY = "e704814c-d75c-4cfe-93ca-135a3380318c";
const HCAPTCHA_SCRIPT_URL = "https://js.hcaptcha.com/1/api.js";
const API_ROUTE_URL = '/api/notify-submission';

interface HCaptchaProps {
    onVerify: (token: string) => void;
    onError: () => void;
}

// Extend Window interface to include hcaptcha global object
declare global {
    interface Window {
        hcaptcha: HCaptchaApi; // Using the defined type
    }
}

const HCaptchaComponent: React.FC<HCaptchaProps> = ({ onVerify, onError }) => {
    const captchaRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | number | null>(null);

    useEffect(() => {
        let script: HTMLScriptElement | null = null;
        
        const initializeCaptcha = () => {
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

        if (typeof window.hcaptcha === 'undefined') {
            script = document.createElement('script');
            script.src = HCAPTCHA_SCRIPT_URL;
            script.async = true;
            script.defer = true;
            script.onload = initializeCaptcha;
            document.head.appendChild(script);
        } else {
            initializeCaptcha();
        }

        return () => {
            const hcaptchaApi = window.hcaptcha;

            if (widgetIdRef.current !== null && hcaptchaApi && hcaptchaApi.remove) {
                try {
                    hcaptchaApi.remove(widgetIdRef.current);
                    widgetIdRef.current = null;
                } catch (e) {
                    console.error("Failed to remove hCaptcha widget:", e);
                }
            }
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={captchaRef} className="flex justify-center">
            {/* HCaptcha will render here */}
        </div>
    );
};
// --- End HCaptcha Component ---


/**
 * Simple form to collect a Name and Email, secured by hCaptcha.
 */
const SimpleContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    // HCaptcha State
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleVerify = (token: string) => {
        setCaptchaToken(token);
        setCaptchaError(null);
    };

    const handleError = () => {
        setCaptchaToken(null);
        setCaptchaError("Captcha failed to load or verify. Please try again.");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitStatus('idle'); // Reset status
        
        const hcaptchaApi = window.hcaptcha;

        if (!captchaToken) {
            setCaptchaError("Please complete the security check before submitting.");
            if (hcaptchaApi && hcaptchaApi.reset) {
                hcaptchaApi.reset();
            }
            return;
        }

        setIsSubmitting(true);
        setCaptchaError(null);

        try {
            // --- ACTUAL API CALL FOR SUBMISSION ---
            const response = await fetch(API_ROUTE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the form data AND the captcha token to the server
                body: JSON.stringify({ name, email, captchaToken }),
            });
            
            if (response.ok) {
                // Success Logic
                console.log("Form successfully submitted.");
                setSubmitStatus('success');
                setName('');
                setEmail('');
                setCaptchaToken(null);
                
                // Manually reset hCaptcha widget after successful submission
                if (hcaptchaApi && hcaptchaApi.reset) {
                    hcaptchaApi.reset();
                }

            } else {
                // Error Logic (e.g., hCaptcha failed verification on server)
                console.error("Submission failed on server.");
                setSubmitStatus('error');
            }

        } catch (error) {
            console.error("Network or submission failure:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
             // Reset captcha on network/server error to force re-verification
            if (submitStatus === 'error' && hcaptchaApi && hcaptchaApi.reset) {
                hcaptchaApi.reset();
            }
        }
    };

    return (
        <section id="rsvp" className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8 font-serif text-[#f2df93]">
                Stay Updated!
            </h2>
            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
              We are currently finalizing details, so we can&apos;t collect a full RSVP just yet! Please enter your name and email below, and we will send you an email notification when the full RSVP page is ready.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 bg-gray-900/80 p-8 rounded-xl shadow-2xl border border-gray-700">
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="bg-green-600/20 text-green-400 p-3 rounded-md border border-green-700 text-center font-medium">
                        Thank you! We&apos;ve received your information.
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="bg-red-600/20 text-red-400 p-3 rounded-md border border-red-700 text-center font-medium">
                        Submission failed. Please try again and complete the security check.
                    </div>
                )}

                {/* Name Field */}
                <div>
                    <label htmlFor="simple-name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="simple-name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Your full name"
                        required
                        className="w-full p-3 border border-gray-700 rounded-md focus:ring-[#f2df93] focus:border-[#f2df93] bg-gray-800 text-[#f7fbfc] placeholder:text-gray-500 shadow-inner"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="simple-email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                        type="email"
                        id="simple-email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="you@example.com"
                        required
                        className="w-full p-3 border border-gray-700 rounded-md focus:ring-[#f2df93] focus:border-[#f2df93] bg-gray-800 text-[#f7fbfc] placeholder:text-gray-500 shadow-inner"
                    />
                </div>

                {/* HCaptcha Implementation */}
                <div className="pt-4 space-y-4">
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

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className={`w-full font-semibold py-3 px-4 rounded-md transition duration-300 shadow-lg ${captchaToken && !isSubmitting ? 'bg-[#f2df93] text-gray-900 hover:bg-[#e6c871]' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`} 
                    disabled={!captchaToken || isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Submit Information'}
                </button>
            </form>
        </section>
    );
};

export default SimpleContactForm;