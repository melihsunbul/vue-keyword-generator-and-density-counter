const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'hind-vadodara': ['"Hind Vadodara"', 'sans-serif'],
            },
            backgroundImage: {
                'header-bg': "url('https://d9hhrg4mnvzow.cloudfront.net/audit.searchads.com/9353016a-ma-background_100000018w0i6048000028.png')",
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
            blue: colors.blue,
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};
