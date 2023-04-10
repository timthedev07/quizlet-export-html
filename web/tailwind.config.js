// const colors = require(`tailwindcss/colors`);
module.exports = {
  content: [
    "./src/pages/**/*.{tsx,ts}",
    "./src/components/**/*.{ts,tsx}",
    "node_modules/dragontail-experimental/dist/cjs/index.js",
  ],
  darkMode: "class",
  mode: "jit",
  variants: {
    extend: {
      typography: ["dark"],
      cursor: ["focus"],
    },
  },
  theme: {
    extend: {
      animation: {
        fall: "fall 400ms ease-out forwards",
        "spin-pulse":
          "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, spin 1s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
