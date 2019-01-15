const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/index.js']
        // app: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    // devtool: 'inline-source-map',
    devServer: {
        // contentBase: './dist',
        // hot: true
    },
    mode: 'development',
    resolve: {
        // you can now require('file') instead of require('file.jsx')
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     // exclude: /(node_modules|bower_components)/,
            //     use: ['@babel/plugin-proposal-decorators'],
            // },
            // {
            //     test: /\.(js|jsx)$/,
            //     // exclude: /(node_modules|bower_components)/,
            //     use: ['@babel/plugin-proposal-class-properties'],
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'React Test',
            template: './index.html',
            inject: true,
            favicon: './favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};