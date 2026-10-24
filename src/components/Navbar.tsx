'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Mail } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#131420]/90 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-[#131420]/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.png"
                alt="Prajjwal Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg tracking-wider text-white hidden sm:inline-block">
              PRAJJWAL<span className="text-[#1cdce8]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#1cdce8] font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-[#1cdce8] to-[#bb77ed] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Contact Button */}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2 rounded-full border border-white/40 text-white hover:border-[#1cdce8] hover:text-[#1cdce8] hover:shadow-[0_0_15px_rgba(28,220,232,0.3)] transition-all duration-300 text-sm font-medium flex items-center gap-2 group"
            >
              <span>Contact Us</span>
              <Mail className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#131420]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#1cdce8]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-center mt-3 px-4 py-2.5 rounded-lg border border-[#1cdce8] text-[#1cdce8] hover:bg-[#1cdce8]/10 font-medium"
          >
            Get In Touch
          </Link>
        </div>
      )}
    </header>
  );
}
