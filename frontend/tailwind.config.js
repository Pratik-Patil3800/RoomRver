/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        light_blue : '#0d6efd',
        light_black : '#00102A',
        bs_cyan:'#0dcaf0',
      }
    },
    container: {
      padding: {
        md: "10rem",
      },
      
    },
  },
  plugins: [],
};
