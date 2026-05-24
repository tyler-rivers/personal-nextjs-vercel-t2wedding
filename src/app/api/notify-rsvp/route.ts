import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// --- Configuration: Variables are securely pulled from Vercel Environment Variables ---
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD; 
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
    // Using Gmail is common, but requires an App Password for SENDER_PASSWORD
    service: 'gmail', 
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
    },
});

interface RsvpPerson {
    attending: boolean;
    food?: string;
    allergies?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
}

type RsvpData = Record<string, RsvpPerson>;

interface RsvpRequestBody {
    guestName: string;
    rsvpData: RsvpData;
    captchaToken: string;
}

/**
 * Handles POST requests from the RSVP form.
 * The exported function MUST be named POST to handle the POST request method.
 */
export async function POST(request: Request) {
    // Check for missing server configuration first. Vercel should have these set.
    if (!HCAPTCHA_SECRET || !SENDER_EMAIL || !SENDER_PASSWORD || !RECIPIENT_EMAIL) {
        console.error("Missing critical environment variables for email or captcha.");
        // Returns a 500 error if the secrets are missing from the Vercel dashboard.
        return NextResponse.json({ error: 'Server configuration error. Secrets missing.' }, { status: 500 });
    }

    try {
        const { guestName, rsvpData, captchaToken } = await request.json() as RsvpRequestBody;

        if (!guestName || !rsvpData || !captchaToken) {
            return NextResponse.json({ error: 'Missing required fields or captcha token.' }, { status: 400 });
        }

        // --- 1. Verify hCaptcha Token ---
        const verificationResponse = await fetch('https://hcaptcha.com/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${HCAPTCHA_SECRET}&response=${captchaToken}`,
        });

        const hcaptchaData = await verificationResponse.json();

        if (!hcaptchaData.success) {
            console.error("hCaptcha verification failed:", hcaptchaData);
            return NextResponse.json({ error: 'Failed security check.' }, { status: 401 });
        }
        
        // --- 2. Format RSVP Data for Email ---
        const formatRsvpDetails = (rsvpData: RsvpData) => {
            let details = '';
            Object.entries(rsvpData).forEach(([personName, personData]) => {
                details += `\n${personName}:\n`;
                details += `  Attending: ${personData.attending ? 'Yes' : 'No'}\n`;
                if (personData.firstName) details += `  First Name: ${personData.firstName}\n`;
                if (personData.lastName) details += `  Last Name: ${personData.lastName}\n`;
                if (personData.food) details += `  Food: ${personData.food}\n`;
                if (personData.allergies) details += `  Allergies: ${personData.allergies}\n`;
                if (personData.email) details += `  Email: ${personData.email}\n`;
                if (personData.phone) details += `  Phone: ${personData.phone}\n`;
            });
            return details;
        };
        
        // --- 3. Send Notification Email ---
        const mailOptions = {
            from: SENDER_EMAIL,
            to: RECIPIENT_EMAIL, 
            subject: `New RSVP Submission from T2Wedding Site: ${guestName}`,
            text: `
A new RSVP submission has been received!

Guest Group: ${guestName}
Time: ${new Date().toLocaleString()}

RSVP Details:
${formatRsvpDetails(rsvpData)}
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`RSVP notification sent for ${guestName}`);
        return NextResponse.json({ message: 'RSVP received and email sent.' }, { status: 200 });

    } catch (error) {
        // Log the full error to the Vercel console/logs for debugging
        console.error('Error processing RSVP submission or sending email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
