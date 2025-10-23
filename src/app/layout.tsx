import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taylor & Tyler's Wedding 2026",
  description: "The wedding website for Taylor Phillips and Tyler Rivers, to be married on November 6 2026.", // This sets the <meta name="description"> tag
  icons: '/favicon.ico', 
  robots: 'noindex, nofollow',
  openGraph: {
    type: "website",
    url: "https://t2wedding.com",
    title: "Taylor & Tyler's Wedding Website",
    description: "A website to celebrate the wedding of Taylor Phillips and Tyler Rivers.",
    siteName: "Taylor & Tyler's Wedding 2026",
    images: [{ url: "../images/wedding_open_graph.webp" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
