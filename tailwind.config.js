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
        background: "#E9FFF3",
        button: "#A8D5BA",
        secondary_button: "#88C093",
        text: "#374B4A",
        secondary_text: "#5B7B6F",
        accent: "#6FA282",
        error: "#E57373",
        calm: "#A8DADC",
        moderate: "#FFD166",
        stressed: "#EF476F",

      }

    },
  },
  plugins: [],
}

