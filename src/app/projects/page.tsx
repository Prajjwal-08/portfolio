'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProjects, Project } from '@/lib/db';
import { ExternalLink, Github, FolderGit2, Search, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjectsList(data);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Collect all unique tags dynamically
  const allTags = ['All', ...Array.from(new Set(projectsList.flatMap((p) => p.tags || [])))];

  const filteredProjects = projectsList.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || (project.tags && project.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#1cdce8]">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Work & Creations</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Featured <span className="bg-gradient-to-r from-[#1cdce8] via-[#bb77ed] to-[#f34a62] bg-clip-text text-transparent">Projects</span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg">
          A showcase of web applications, custom APIs, and digital platforms built with a focus on
          clean code, intuitive UX, and real-world impact.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#1cdce8] transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {allTags.slice(0, 7).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-[#1cdce8] text-black font-semibold'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-8 h-8 text-[#1cdce8] animate-spin" />
          <p className="text-gray-400 text-sm">Loading projects from database...</p>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl glow-card overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Project Image */}
                <div className="relative w-full h-52 bg-[#0e0f18] overflow-hidden border-b border-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-bold text-white group-hover:text-[#1cdce8] transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-xs bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex items-center gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1cdce8]/10 hover:bg-[#1cdce8] text-[#1cdce8] hover:text-black font-medium text-xs transition-all duration-300 border border-[#1cdce8]/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Project</span>
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white font-medium text-xs transition-all duration-300 border border-white/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {!project.link && !project.github && (
                  <span className="text-xs text-gray-500 italic py-2">
                    Internal / Enterprise project
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="mt-4 px-4 py-2 text-sm text-[#1cdce8] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
