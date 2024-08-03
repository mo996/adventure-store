module.exports = {
  theme: {
    extend: {
      colors: {
        retroBrown: '#7D5A50',   // Muted brown
        retroGreen: '#A3B18A',   // Muted green
        retroOrange: '#DAB785',  // Muted orange
        retroYellow: '#F9E4B7',  // Muted yellow
        retroBeige: '#E6D5B8',   // Soft beige
      },
      fontFamily: {
        sans: ['VT323', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active', 'focus'],
    },
  },
  plugins: [],
}
