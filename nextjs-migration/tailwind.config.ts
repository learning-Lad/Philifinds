import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-forest': '#2D4C2D',
        'primary-sage': '#7AA082',
        'bg-cream': '#FAF9F6',
        'bg-mint': '#D9EAD3',
        'accent-sand': '#D2B48C',
        'text-charcoal': '#1A1A1A',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(45, 76, 45, 0.08)',
        'soft-lg': '0 4px 16px rgba(45, 76, 45, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
