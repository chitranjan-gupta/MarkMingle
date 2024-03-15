module.exports = {
	content: [
    './pages/**/*.{html,js, jsx, md, mdx}',
    './components/**/*.{html,js, jsx, md, mdx}',
  ],
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
