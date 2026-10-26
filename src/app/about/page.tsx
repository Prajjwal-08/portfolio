'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTimeline, TimelineItem } from '@/lib/db';
import { Download, GraduationCap, Briefcase, Calendar, ArrowRight, UserCheck, Loader2 } from 'lucide-react';

export default function AboutPage() {
  const [timeline, setTimeline] = useState<{
    experience: TimelineItem[];
    education: TimelineItem[];
  }>({ experience: [], education: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTimeline() {
      try {
        const data = await getTimeline();
        setTimeline(data);
      } finally {
        setLoading(false);
      }
    }
    loadTimeline();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#1cdce8]">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Get to know me</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-[#1cdce8] via-[#bb77ed] to-[#f34a62] bg-clip-text text-transparent">Prajjwal Shrimal</span>
          </h1>

          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>
              I&apos;m Prajjwal Shrimal, a passionate web developer with extensive hands-on experience in
              modern full-stack systems, PHP, Laravel, CodeIgniter, Next.js, and WordPress. I thrive on
              solving complex problems and crafting intuitive, user-friendly digital experiences.
            </p>
            <p>
              With a solid foundation in computer applications and modern web standards, I continuously
              stay updated with the latest industry tooling. I excel across frontend and backend engineering,
              database optimization, and seamless API integrations.
            </p>
            <p>
              I love collaborating with cross-functional teams, brainstorming innovative ideas, and building
              scalable architectures that deliver measurable value to users.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="/cv-Prajjwal-Shrimal.pdf"
              download
              className="btn-neon"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white/50 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 text-[#1cdce8]" />
            </Link>
          </div>
        </div>

        {/* Quick Info Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl glow-card space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Quick Profile</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Location:</span>
              <span className="text-white font-medium">India</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Education:</span>
              <span className="text-white font-medium">MCA (Manipal University)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Role:</span>
              <span className="text-white font-medium">Full Stack Developer</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Focus:</span>
              <span className="text-[#1cdce8] font-medium">Next.js, Laravel, Full-Stack</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Availability:</span>
              <span className="text-[#00D763] font-medium">Open to Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-8 h-8 text-[#1cdce8] animate-spin" />
          <p className="text-gray-400 text-sm">Loading timeline history...</p>
        </div>
      ) : (
        /* Experience & Education Timelines */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1cdce8]/10 text-[#1cdce8] border border-[#1cdce8]/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Work Experience</h2>
            </div>

            <div className="space-y-6 relative pl-6 border-l-2 border-white/10">
              {timeline.experience.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#1cdce8] ring-4 ring-[#131420] transition-transform group-hover:scale-125" />

                  <div className="p-6 rounded-2xl glow-card space-y-2 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#1cdce8] transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#1cdce8] bg-[#1cdce8]/10 px-2.5 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-400">{item.organization}</p>
                    <p className="text-sm text-gray-300 leading-relaxed pt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#bb77ed]/10 text-[#bb77ed] border border-[#bb77ed]/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Education</h2>
            </div>

            <div className="space-y-6 relative pl-6 border-l-2 border-white/10">
              {timeline.education.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#bb77ed] ring-4 ring-[#131420] transition-transform group-hover:scale-125" />

                  <div className="p-6 rounded-2xl glow-card space-y-2 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#bb77ed] transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#bb77ed] bg-[#bb77ed]/10 px-2.5 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-400">{item.organization}</p>
                    <p className="text-sm text-gray-300 leading-relaxed pt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
