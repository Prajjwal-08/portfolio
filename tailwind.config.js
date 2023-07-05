/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
     textColor:{
      'bglr': 'linear-gradient(to right, #FAFF0C, #FFA901, #18FF04, #11F6B3, #0F25E7, #BA17F9, #F40000)'
     }
    }
  },
  plugins: []
};