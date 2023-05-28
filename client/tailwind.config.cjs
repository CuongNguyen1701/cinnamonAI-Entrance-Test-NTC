/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});
const advancedTransform = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});
const transformStyles = plugin(function ({ addUtilities }) {
  addUtilities({
    ".transform-preserve-3d": {
      "transform-style": "preserve-3d",
    },
  });
});
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "vn-circle": "url('/src/assets/flags-circle/vn-circle.png')",
        "en-circle": "url('/src/assets/flags-circle/en-circle.png')",
      },
    },
  },
  plugins: [
    backfaceVisibility,
    advancedTransform,
    transformStyles,
  ],
};
