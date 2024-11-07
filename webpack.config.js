const path = require('path');
const glob = require('glob');

const PugPlugin = require('pug-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Ttf2WoffPlugin = require('./plugins/ttf2woff-plugin')

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
        new Ttf2WoffPlugin({
            fontStyleFile: path.resolve(__dirname, 'src/styles/fonts.scss')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets/fonts/converted/**/*',
                    to: 'assets/fonts/[name].[ext]'
                }
            ]
        })
    ],
    devServer: {
        compress: false,
        port: 9000,
        hot: true,
        static: {
            directory: path.join(__dirname, './'),
            serveIndex: true,
        },
    },
    mode: 'development',
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'assets/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
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