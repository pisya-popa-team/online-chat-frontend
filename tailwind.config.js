/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      dark: "#333333",
      "dark-90": "#333333E5",
      "dark-80": "#333333CC",
      "dark-60": "#33333399",
      link: "#3BC9DB",
      text: "#fdfdfd",
      "text-muted": "#FFFFFF80",
      brand: "#0c8498",
      "brand-60": "#0C849899",
      "brand-40": "#0C849866",
      "brand-10": "#0C849819",
      danger: "#f85151",
      glass: "#C5F6FA33",
      white: "#fdfdfd",
      "white-60": "#FDFDFD99",
      "white-50": "#FDFDFD7F",
    },
    extend: {
      backgroundImage: {
        auth: "url(/images/auth-bg.png)",
        main: "url(/images/main-bg.png)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        15: "15px",
      },
      maxWidth: {
        form: "480px",
      },
      borderRadius: {
        20: "20px",
      },
    },
  },
  plugins: [],
};
