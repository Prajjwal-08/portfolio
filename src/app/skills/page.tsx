'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSkills, subscribeSkills, Skill } from '@/lib/db';
import { Wrench, Sparkles, Loader2 } from 'lucide-react';

const categories = ['All', 'Frontend', 'Backend', 'CMS & E-commerce', 'Tools & Cloud'] as const;

export default function SkillsPage() {
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const unsubscribe = subscribeSkills((data) => {
      setSkillsList(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredSkills =
    activeCategory === 'All'
      ? skillsList
      : skillsList.filter((skill) => skill.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header section with illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#1cdce8]">
            <Wrench className="w-3.5 h-3.5" />
            <span>Tech Stack & Tools</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Technical <span className="text-[#1cdce8]">Skills</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            I possess a diverse set of technical skills that enable me to tackle complex engineering
            challenges with ease. From developing responsive, high-performance web applications to
            optimizing backend architectures and APIs, I bring an adaptable, production-focused approach.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-[#1cdce8] text-black font-semibold shadow-lg shadow-[#1cdce8]/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 bg-[#1cdce8]/10 rounded-full blur-3xl" />
            <div className="relative w-full h-full animate-float flex items-center justify-center">
              <Image
                src="/learn.png"
                alt="Skills & Learning"
                width={320}
                height={320}
                className="object-contain drop-shadow-[0_10px_25px_rgba(28,220,232,0.2)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-8 h-8 text-[#1cdce8] animate-spin" />
          <p className="text-gray-400 text-sm">Loading skills from database...</p>
        </div>
      ) : (
        /* Skills Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group relative p-5 rounded-2xl glow-card flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105"
            >
              {/* Ambient card glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              {/* Icon Container */}
              <div className="relative w-16 h-16 mb-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#1cdce8]/50 group-hover:shadow-[0_0_15px_rgba(28,220,232,0.2)] transition-all">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Skill Name */}
              <h2 className="text-sm font-semibold text-white group-hover:text-[#1cdce8] transition-colors">
                {skill.name}
              </h2>

              {/* Category Pill */}
              <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Highlights summary */}
      <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1a1b2e] to-[#131420] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-[#bb77ed]" />
            Continuous Learning & Adaptability
          </h2>
          <p className="text-sm text-gray-400">
            Currently deepening expertise in Next.js 15, TypeScript, cloud deployments, and modern full-stack architectures.
          </p>
        </div>
      </div>
    </div>
  );
}
