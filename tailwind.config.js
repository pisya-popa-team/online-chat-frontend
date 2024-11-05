/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      dark: "#333333",
      link: "#3BC9DB",
      text: "#fdfdfd",
      muted: "#FFFFFF80",
      brand: "#0c8498",
      danger: "#f85151",
      glass: "#C5F6FA33",
      white: "#fdfdfd",
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
        "14-17": ["14px", "17px"],
        "15-18": ["15px", "18px"],
        "32-38": ["32px", "38px"],
        "20-24": ["20px", "24px"],
      },
      maxWidth: {
        form: "480px",
      },
      borderRadius: {
        20: "20px",
      },
      backdropBlur: {
        10: "10px",
      },
    },
  },
  plugins: [],
};
