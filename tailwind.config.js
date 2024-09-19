/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      fontFamily: {
        title: ['Poppins', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
        accent: ['Dancing Script', 'cursive']
      },

      colors: {
        background: "#F2FFF8",
        primary: "#5B7B6F",
        onPrimary: "#FFFFFF",
        secondaryContainer: "#E9F7EF",
        secondary: "#E0E0E0",
        error: "#E57373",
        calm: "#A8DADC",
        moderate: "#FFD166",
        stressed: "#EF476F",

      }

    },
  },
  plugins: [],
}

