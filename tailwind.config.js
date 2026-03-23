import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#AEB784",
          dark: "#41431B",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#AEB784",      // আপনার লোগোর সবুজ
          "primary-focus": "#41431B",
          "secondary": "#E3DBBB",
          "accent": "#F8F3E1",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};