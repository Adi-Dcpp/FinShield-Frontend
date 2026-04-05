/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                twinkle: 'twinkle 3s ease-in-out infinite',
                fadeIn: 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backgroundImage: {
                'radial-gradient': 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.5) 100%)',
            },
        },
    },
    plugins: [],
}
