import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// --- Configuration: Variables are securely pulled from Vercel Environment Variables ---
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;
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

/**
 * Handles POST requests from the contact form.
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
        const { name, email, captchaToken } = await request.json();

        if (!name || !email || !captchaToken) {
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
        
        // --- 2. Send Notification Email ---
        const mailOptions = {
            from: SENDER_EMAIL,
            to: RECIPIENT_EMAIL, 
            subject: `New Save the Date from T2Wedding Site: ${name}`,
            text: `
A new save-the-date interest submission has been received!

Name: ${name}
Email: ${email}
Time: ${new Date().toLocaleString()}

They are awaiting the full RSVP form.
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Notification sent for ${name}`);
        return NextResponse.json({ message: 'Submission received and email sent.' }, { status: 200 });

    } catch (error) {
        // Log the full error to the Vercel console/logs for debugging
        console.error('Error processing submission or sending email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
