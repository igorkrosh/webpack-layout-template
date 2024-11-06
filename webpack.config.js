const path = require('path');
const PugPlugin = require('pug-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
        new CopyPlugin({
            patterns: [{
                from: 'assets/images/**/*',
                to: ''
            }]
        })
    ],
    mode: 'production',
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
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
        ]
    }
}