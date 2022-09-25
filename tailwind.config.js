/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "base-dark": "#0B0B0B",
                "base-light": "#FFFFFF",
                "base-blurple": "#4E75FF",
                "blue-dark": "#000210",
                "blue-light": "#7694FF",
            },
            animation: {
                "pulse-full": "pulse-full ease-in-out 2s infinite",
            },
            keyframes: {
                "pulse-full": {
                    "0%, 100%": {
                        opacity: 0,
                    },
                    "50%": {
                        opacity: 1,
                    },
                }
            }
        },
        fontFamily: {
            oxygen: ["Oxygen", "sans-serif"],
            "moon-dance": ['"Moon Dance"', "cursive"],
            inter: ["Inter", "sans-serif"],
            inconsolata: ["Inconsolata", "monospace"],
        },
    },
    plugins: [],
    darkMode: "class",
};
