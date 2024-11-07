const path = require('path');
const glob = require('glob');

const PugPlugin = require('pug-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist/'),
        clean: true,
        filename: 'assets/scripts/[name].js'
    },
    plugins: [
        new PugPlugin({
            entry: 'src/pages/',
        }),
    ],
    mode: 'production',
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'assets/'),
            'ttf-loader': path.resolve(__dirname, 'loaders/ttf-loader.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['sass-loader'],
                type: "asset/resource",
                generator: {
                    filename: "assets/styles/[name].css",
                },
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]'
                }
            },
        ]
    }
}