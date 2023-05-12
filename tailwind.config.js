/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#D11A2A",
          secondary: "#2D2D2D",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#F5F5F5",
          "base-200": "#212427",
          "base-300": "#E5E6E6",
          "btn-content": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
