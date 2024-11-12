import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ['bg-red', 'bg-green'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue": '#4F80C0',
        "darkBlue": '#002D63',
        "lightBlue": '#EBF4FF',
        "buttonActive": '#D7E9FF',
        "skeleton": '#DAEBFF',
        "skeletonPrimary": '#c3d7f1'
      },
      boxShadow: {
        "top": '0px -2px 15px rgba(0, 0, 0, 0.15)',
        "beverage": '0px 0px 10px rgba(79, 128, 192, 0.3)',
        "login-button": '0px 2.5px 1px rgba(79, 128, 192, 0.15)'
      },
      gridTemplateRows: {
        '10-80-10': '10% 80% 10%',
      },
      backgroundImage: {
          'signIn': "url('/icons/Subtract.svg')"
      },
    },
  },
  plugins: [],
};

export default config;
