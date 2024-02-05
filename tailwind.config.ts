import withMT from "@material-tailwind/react/utils/withMT";


module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slidein : {
          from : {
            opacity : "0",
            transform : "translateY(-10px)"
          },
          to:{
            opacity: '1',
            transform : "translateY(0) "
          }
        }
      },
      animation: {
        slidein300: "slidein 1s ease 300ms forwards",
        slidein700: "slidein 1s ease 700ms forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});



