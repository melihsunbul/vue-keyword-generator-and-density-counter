module.exports = {
    extends: [
        '@mobileaction',
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.resolve.js',
            },
        },
    },
};
