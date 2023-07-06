/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
     textColor:{
      'bglr': 'linear-gradient(to right, #FAFF0C, #FFA901, #18FF04, #11F6B3, #0F25E7, #BA17F9, #F40000)',
     },
     backgroundImage: {
      'bglr': 'linear-gradient(to right, #6992A0, #9C62D1, #E1BD81)',
    },
    keyframes: {
      typing: {
        "0%": {
          width: "0%",
          visibility: "hidden"
        },
        "100%": {
          width: "100%"
        }  
      },
      blink: {
        "50%": {
          borderColor: "transparent"
        },
        "100%": {
          borderColor: "white"
        }  
      }
    },
    animation: {
      typing: "typing 2s steps(15) infinite alternate, blink .7s infinite"
    },
    }
  },
  plugins: []
};