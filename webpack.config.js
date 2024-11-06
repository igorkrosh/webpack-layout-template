const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist/'),
        clean: true,
    },
    plugins: [
        new PugPlugin({
            entry: 'src/pages/',
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
                use: [
                    'sass-loader',
                ],
                type: "asset/resource",
                generator: {
                    filename: "assets/styles/[name].css",
                },
            }
        ]
    }
}