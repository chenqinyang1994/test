const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: {
        home: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'cqy.html'
        }),
        new CleanWebpackPlugin('./dist'),
        new CopyWebpackPlugin([
            {
                from: './doc',
                to: ''
            }
        ]),
        new Webpack.BannerPlugin('made in 2019 by cqy')
    ]
}