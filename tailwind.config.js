/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          grass: 'rgb(67, 176, 42)',
          dirt: 'rgb(96, 60, 32)',
          stone: 'rgb(127, 127, 127)',
          wood: 'rgb(143, 119, 72)',
          diamond: 'rgb(51, 235, 203)',
          gold: 'rgb(221, 176, 31)',
          redstone: 'rgb(255, 73, 73)',
          emerald: 'rgb(0, 180, 93)',
          obsidian: 'rgb(20, 14, 29)',
          night: 'rgb(18, 18, 24)',
          deepnight: 'rgb(10, 10, 15)'
        },
      },
      fontFamily: {
        minecraft: ['MinecraftFont', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'minecraft-dirt': 'url("/textures/dirt.png")',
        'minecraft-stone': 'url("/textures/stone.png")',
        'minecraft-planks': 'url("/textures/planks.png")',
      },
      animation: {
        'pixel-border': 'pixel-border 1s infinite',
        'hover-bounce': 'hover-bounce 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'pixel-border': {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(67, 176, 42, 0.7)' },
          '50%': { boxShadow: '0 0 0 3px rgba(51, 235, 203, 0.7)' },
        },
        'hover-bounce': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
} 