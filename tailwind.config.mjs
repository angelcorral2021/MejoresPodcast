/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accessible-purple': '#5b21b6'
      },
      ringColor: {
        DEFAULT: '#6d28d9'
      },
      boxShadow: {
        'focus-ring': '0 0 0 3px rgba(99,102,241,0.15)'
      }
    },
  },
  plugins: [],
}

