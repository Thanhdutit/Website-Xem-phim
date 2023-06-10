/**@type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main :"#080A1A",
        subMain :'#F20000',
        dry: '#0B0F29',
        star:'#FFB000',
        text :'#C0C0C0',
        border :'#4b5563',
        dryGray:'#E0D5D5',
        main1:'#1874CD',
        main2:'#6798c9',
        main3 :'rgb(48, 48, 48)',

      },
      height: {
        header : '500px',
        rate: '400px',
      },
      fontSize: {
        h1:'2.6rem',
      },
      screens :{
        xs:'475px',
      },

    },
  },
  plugins: [
      require('@tailwindcss/line-clamp')

  ],
}