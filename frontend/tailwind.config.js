/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const tailwindcolors = require("tailwindcss/colors");

module.exports = withMT({
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      // => @media (min-width: 480px) { ... }

      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    colors: {
      ...tailwindcolors,
    },

    extend: {
      colors: {
        coral: "#FCC82D",
        divider: "#ffffff26",
        black: "#100f10",
        cred: "#ad241b",
        cblack: {
          100: "#252631",
          200: "#242526",
          300: "#1f1e24",
          400: "#171d22",
          500: "#02050a",
          600: "#12151e",
          700: "#0a061a"
        },
        form: "#ffffff0d",
        input: "#ffffff0d",
        image: "#00000000",
      },

      fontFamily: {
        manrope: "Manrope",
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
});
