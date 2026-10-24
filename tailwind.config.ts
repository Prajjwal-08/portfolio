import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#131420',
        card: '#1a1b2e',
        'card-border': 'rgba(255, 255, 255, 0.1)',
        primary: {
          cyan: '#1cdce8',
          purple: '#bb77ed',
          pink: '#f34a62',
          green: '#00D763',
          blue: '#149CEA',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #1cdce8, #bb77ed, #f34a62)',
        'bglr': 'linear-gradient(to right, #6992A0, #9C62D1, #E1BD81)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
