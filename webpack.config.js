const path = require('path');
const glob = require('glob');

const PugPlugin = require('pug-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Ttf2WoffPlugin = require('./plugins/ttf2woff-plugin');
const PostProductionPlugin = require('./plugins/post-production-plugin');
const DebugAliasPlugin = require('./plugins/debug-alias-plugin');

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
    //stats: 'errors-only',
    devtool: isProduction ? false : 'source-map',
    output: {
        path: path.join(__dirname, 'dist/'),
        clean: true,
        filename: 'assets/scripts/[name].js',
    },
    plugins: [
        new DebugAliasPlugin(),
        new PugPlugin({
            entry: 'src/pages/',
            css: {
                filename: 'assets/styles/[name].css'
            },
            optimization: {
                minimize: false
            },
            loaderOptions: {
                sources: [
                    {
                        tag: 'a',
                        attributes: ['href']
                    }
                ]
            }
        }),
        new Ttf2WoffPlugin({
            fontStyleFile: path.resolve(__dirname, 'src/styles/fonts.scss')
        }),
        new PostProductionPlugin()
    ],
    devServer: {
        compress: false,
        port: 9000,
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, './'),
            serveIndex: true,
        },
        client: {
            logging: 'error'
        },
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'assets'),
            '@node': path.resolve(__dirname, 'node_modules'),
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isProduction,
                            import: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isProduction,
                        },
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