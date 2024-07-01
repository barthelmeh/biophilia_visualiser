/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      fontFamily: {
        title: ['Poppins', 'sans-serif'],
        body: ['NunitoSans', 'sans-serif'],
        accent: ['DancingScript', 'cursive']
      },

      colors: {
        background: "#E9FFF3",
        button: "#A8D5BA",
        text: "#374B4A",
        secondary_text: "#5B7B6F"
      }

    },
  },
  plugins: [],
}

