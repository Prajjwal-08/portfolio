import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Prajjwal Shrimal | Full Stack Web Developer & Designer',
  description:
    'Portfolio of Prajjwal Shrimal - Full Stack Web Developer specializing in Next.js, React, Laravel, PHP, and modern web solutions.',
  icons: {
    icon: '/logo.png',
  },
  keywords: [
    'Prajjwal Shrimal',
    'Web Developer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'Laravel',
    'Portfolio',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#131420] text-white min-h-screen flex flex-col selection:bg-[#1cdce8]/30 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
