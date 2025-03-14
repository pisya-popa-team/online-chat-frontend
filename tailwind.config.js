/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#333333",
        link: "#3BC9DB",
        text: "#fdfdfd",
        muted: "#FFFFFF80",
        brand: "#0c8498",
        darkBrand: "#0B7285",
        danger: "#f85151",
        glass: "#C5F6FA33",
        white: "#fdfdfd",
        incoming_message: "#C5F6FA",
        outgoing_message: "#15AABF",
      },
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
        "16-20": ["16px", "20px"],
      },
      minWidth: {
        25: "25rem",
      },
      maxWidth: {
        form: "30rem",
        25: "25rem",
      },
      maxHeight: {
        5.25: "1.313rem",
        195: "47.5rem",
        200: "50rem",
      },
      minHeight: {
        90: "22.5rem",
        100: "25rem",
      },
      borderRadius: {
        20: "1.25rem",
        max: "1000px",
        xs: "0.25rem",
      },
      backdropBlur: {
        10: "10px",
      },
      height: {
        3.25: "0.813rem",
        3.75: "0.938rem",
        186: "42.5rem",
        200: "50rem",
      },
      width: {
        3.25: "0.813rem",
        3.75: "0.938rem",
        186: "42.5rem",
        200: "50rem",
      },
      spacing: {
        18: "4.25rem",
      },
      boxShadow: {
        modal: "0px 0px 6px 0px #00000040",
      },
    },
  },
  plugins: [],
};
