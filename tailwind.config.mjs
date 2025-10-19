/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'bordercustom': '30px',
      },
      lineHeight: {
        'custom': '52px',
      },
      spacing: {
        '7.5': '40px', // Custom spacing for 30px
      },
      screens: {
        'xs': '425px',   // Custom breakpoint for 425px
        'mdx': '769px',  // Custom breakpoint for 769px
        'lg': '1024px',  // Default Tailwind 1024px breakpoint
        'xl': '1280px', // Default Tailwind 1280px breakpoint
        'xlx': '1440px',   // Custom for 1440px (HD screens)
        '2xl': '1536px', // Default Tailwind 1536px breakpoint

      },
      colors: {
        customRed: "#f0644b", // Custom text color
      },
      colors: {
        customRed: '#f0644b',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
