let path = require('path');
let HtmlWabpackPlugin = require('html-webpack-plugin');
let { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: 'file-loader?limit=8192'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWabpackPlugin({
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ]
}