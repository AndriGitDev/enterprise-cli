import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-green': '#00ff9d',
        'cyber-cyan': '#00d4ff',
        'cyber-dark': '#0a0a0f',
        'cyber-gray': '#b0b0b0',
        'cyber-pink': '#ff006e',
        'cyber-yellow': '#ffbe0b',
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'Consolas', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
