import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PhiliFinds - AI-Powered Travel Planning for the Philippines',
  description: 'Discover the Philippines like never before with AI-generated itineraries tailored to your preferences and budget.',
  keywords: ['Philippines', 'Travel', 'AI', 'Itinerary', 'Planning', 'Tourism'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
