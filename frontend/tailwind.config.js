/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a2e',
          600: '#22223a',
          500: '#2a2a42',
        },
        accent: {
          primary: '#6c5ce7',
          secondary: '#a29bfe',
          glow: '#7c6df0',
        },
        success: '#00cec9',
        warning: '#fdcb6e',
        danger: '#ff7675',
        text: {
          primary: '#e8e8f0',
          secondary: '#9d9db5',
          muted: '#6c6c85',
        },
        border: '#2a2a42',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
