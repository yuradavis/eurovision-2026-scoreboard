/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", 'sans-serif'],
        body: ["'DM Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      colors: {
        night: {
          950: '#06040f',
          900: '#0d0820',
          800: '#13102e',
          700: '#1a163c',
        },
        neon: {
          pink: '#f72585',
          purple: '#7209b7',
          violet: '#a855f7',
          cyan: '#4cc9f0',
          blue: '#4361ee',
          lime: '#b5e61d',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top left, #3b0764 0%, #06040f 50%, #0c1445 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(114,9,183,0.15) 0%, rgba(67,97,238,0.1) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #f72585, #7209b7, #4361ee, #4cc9f0)',
        'pink-purple': 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
        'blue-cyan': 'linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%)',
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(247,37,133,0.4), 0 0 40px rgba(247,37,133,0.1)',
        'neon-purple': '0 0 20px rgba(114,9,183,0.4), 0 0 40px rgba(114,9,183,0.1)',
        'neon-cyan': '0 0 20px rgba(76,201,240,0.4), 0 0 40px rgba(76,201,240,0.1)',
        'neon-blue': '0 0 20px rgba(67,97,238,0.4), 0 0 40px rgba(67,97,238,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-lg': '0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
