import Image from 'next/image';
import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import { ArrowRight, Code2, Sparkles, Layers } from 'lucide-react';

export default function Home() {
  const roles = [
    'WEB DEVELOPER',
    'WEB DESIGNER',
    'FREELANCER',
    'FULL STACK DEVELOPER',
  ];

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#1cdce8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#bb77ed]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
              <Sparkles className="w-4 h-4 text-[#1cdce8]" />
              <span>Available for Freelance & Full-time opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Hi, I&apos;m{' '}
              <span className="relative whitespace-nowrap">
                Prajjwal Shrim
                <span className="bg-[#00D763] text-black px-2 py-0.5 rounded-md inline-block">
                  al
                </span>
              </span>
            </h1>

            <div className="text-3xl sm:text-5xl font-extrabold h-16 flex items-center">
              <Typewriter words={roles} />
            </div>

            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
              &ldquo;Welcome to my digital space! I craft modern, responsive web experiences—combining
              elegant UI design with scalable backend technology to make your online presence stand out.&rdquo;
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/contact" className="btn-neon">
                <span>Hire Me</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/projects"
                className="px-6 py-3 rounded-lg border border-white/20 hover:border-white/50 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#bb77ed]" />
                <span>View Projects</span>
              </Link>
            </div>

            {/* Quick highlight cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-2xl font-bold text-[#1cdce8]">2+ Years</p>
                <p className="text-xs text-gray-400 mt-0.5">Industry Experience</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-2xl font-bold text-[#bb77ed]">10+ Projects</p>
                <p className="text-xs text-gray-400 mt-0.5">Delivered Successfully</p>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-2xl font-bold text-[#00D763]">Full Stack</p>
                <p className="text-xs text-gray-400 mt-0.5">PHP, Laravel, JS, Next</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#1cdce8]/30 via-[#bb77ed]/30 to-[#f34a62]/30 blur-2xl transform rotate-6 scale-95" />

              {/* Decorative Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#1a1b2e] to-[#131420] p-4 shadow-2xl flex items-center justify-center group">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/2.png"
                    alt="Prajjwal Shrimal"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-2 -right-2 bg-[#1a1b2e]/90 border border-white/15 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                  <Code2 className="w-5 h-5 text-[#1cdce8]" />
                  <span className="text-xs font-semibold text-white">Full Stack Dev</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
