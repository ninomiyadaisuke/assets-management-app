const { violet, blackA, mauve, green } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "0px",
      md: "800px",
    },
    extend: {
      colors: {
        "input-error": "rgba(255,93,84,0.07)",
        "card":'rgba(255,255,255,0.9)',
        "card-link":"#37679c",
        "num-def": "#585858",
        "num-plus": "#ff5d54",
        "num-minus": "#267dd4",
        primary: "#2774cc",
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      aria: {
        invalid: 'invalid="true"',
        variant: 'variant="default"',
      },
    },
  },
  plugins: [],
};
