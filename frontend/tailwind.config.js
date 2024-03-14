module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      0: "0",
      "1/5": "20%",
      "1/4": "25%",
      "1/3": "33.3333%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
