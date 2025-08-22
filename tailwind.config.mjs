export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure Tailwind scans your files
  ],
  theme: {
    extend: {
      lineHeight: {
        120: "120%", // Adds a custom class for line-height of 120%
      },
      colors: {
        primary: "#8767CF",
        primary10: "#E9E3F6",
        primary20: "#E9E3F633",
        secondary: "#16131A",
        accent: "#F2EBFF",
        linkColor: "#7B8293",
        input: "#181A1F",
        mainBlack: "#0d0e11",
        primary80: "#8B6DCA",
        black: "#272C33",
        greenbg: "#79CA6D26",
        green: "#79CA6D",
      },
    },
    backgroundImage: {
      "top-gradient":
        "linear-gradient(90deg, #0D0E11 0%, #8B6DCA 25%, #8B6DCA 60%, #0D0E11 100%)",
      login: "url('/images/loginBg.webp')",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".dark-box": {
          "@apply dark:bg-white dark:border dark:border-input": {},
        },
        ".dark-head": {
          "@apply dark:bg-white dark:border-b dark:border-input": {},
        },
      });
    },
  ],
};
