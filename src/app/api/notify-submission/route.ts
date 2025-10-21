import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// --- Configuration ---
// Get these from your environment variables (.env.local)
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD; // App password for Gmail, or similar
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL; // The email address you want to receive the notification at

const transporter = nodemailer.createTransport({
    // Use your email service provider details (e.g., Gmail, SendGrid, etc.)
    service: 'gmail', // Example: Use 'gmail'
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
    },
});

/**
 * Handles POST requests from the contact form.
 */
export async function POST(request: Request) {
    const { name, email, captchaToken } = await request.json();

    if (!name || !email || !captchaToken) {
        return NextResponse.json({ error: 'Missing required fields or captcha token.' }, { status: 400 });
    }

    // --- 1. Verify hCaptcha Token ---
    try {
        const hcaptchaResponse = await fetch('https://hcaptcha.com/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${HCAPTCHA_SECRET}&response=${captchaToken}`,
        });

        const hcaptchaData = await hcaptchaResponse.json();

        if (!hcaptchaData.success) {
            console.error("hCaptcha verification failed:", hcaptchaData);
            return NextResponse.json({ error: 'Failed security check.' }, { status: 401 });
        }
    } catch (e) {
        console.error("Error verifying hCaptcha:", e);
        return NextResponse.json({ error: 'Internal server error during security check.' }, { status: 500 });
    }

    // --- 2. Send Notification Email ---
    const mailOptions = {
        from: SENDER_EMAIL,
        to: RECIPIENT_EMAIL, // Notification email goes here
        subject: `New Save the Date from T2Wedding Site: ${name}`,
        text: `
A new save-the-date interest submission has been received!

Name: ${name}
Email: ${email}
Time: ${new Date().toLocaleString()}

They are awaiting the full RSVP form.
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification sent for ${name}`);
        return NextResponse.json({ message: 'Submission received and email sent.' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send notification email.' }, { status: 500 });
    }
}