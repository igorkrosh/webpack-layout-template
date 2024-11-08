const path = require('path');
const glob = require('glob');

const PugPlugin = require('pug-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Ttf2WoffPlugin = require('./plugins/ttf2woff-plugin')

module.exports = {
    //stats: 'errors-only',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'dist/'),
        clean: true,
        filename: 'assets/scripts/[name].js',
        devtoolModuleFilenameTemplate: info => 'file:///' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    plugins: [
        new PugPlugin({
            entry: 'src/pages/',
            css: {
                // CSS output filename with hash for unique id
                filename: 'assets/styles/[name].css'
            },
            optimization: {
                minimize: false
            },
        }),
        new Ttf2WoffPlugin({
            fontStyleFile: path.resolve(__dirname, 'src/styles/fonts.scss')
        }),
        //new CopyPlugin({})
    ],
    devServer: {
        compress: false,
        port: 9000,
        hot: true,
        static: {
            directory: path.join(__dirname, './'),
            serveIndex: true,
        },
        client: {
            logging: 'error'
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
                    { loader: 'css-loader', options: { sourceMap: true } },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
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
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
        ]
    }
}