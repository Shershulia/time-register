/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      "s-yellow": "#EEA47F",
      "s-mint": "#00539C",
      "s-blue" : "#82A0D8",
      "s-pink" : "#EDB7ED",
      "white" : "#FFFFFF",
      "dark-blue": "#5b7d97",
      "yellow": "#ffbd03",
      "dark-yellow": "#a47900",
      "red" : "#ED0800",
      "green": "#008000",
      "dark-green" : "#005700",
      "dark-red" : "#a90500",
      "gray" : "#808080",
      "background" : "#FFEFD5",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', 
        
        
      },
    },
  },
  plugins: [],
}
