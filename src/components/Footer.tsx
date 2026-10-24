import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0e0f18] py-10 mt-20 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-white font-medium text-base">Prajjwal Shrimal</p>
          <p className="text-xs text-gray-500 mt-1">
            Full Stack Web Developer & Designer
          </p>
        </div>

        <div className="flex items-center gap-6 text-gray-400">
          <a
            href="https://github.com/Prajjwal-08"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1cdce8] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/prajjwal-shrimal/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1cdce8] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.behance.net/prajjwalshrimal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1cdce8] transition-colors"
          >
            Behance
          </a>
          <a
            href="https://www.instagram.com/_.prajju08._/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1cdce8] transition-colors"
          >
            Instagram
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Prajjwal Shrimal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
