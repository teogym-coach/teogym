import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FCFBF8',
        sand: '#F4EFE8',
        card: '#FFFFFF',
        ink: '#2E2E2E',
        'ink-soft': '#6B655C',
        line: '#E8E1D5',
        accent: {
          DEFAULT: '#C89A5B',
          deep: '#A87F45',
          soft: '#F1E6D4',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(46, 46, 46, 0.04), 0 8px 24px rgba(46, 46, 46, 0.06)',
        lift: '0 2px 4px rgba(46, 46, 46, 0.05), 0 16px 40px rgba(46, 46, 46, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
