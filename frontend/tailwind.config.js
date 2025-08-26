import flowbiteReact from "flowbite-react/plugin/tailwindcss";

// tailwind.config.js
const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".flowbite-react/class-list.json"],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
};

export default tailwindConfig;