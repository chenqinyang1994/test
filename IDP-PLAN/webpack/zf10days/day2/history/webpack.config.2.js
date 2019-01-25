const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    watch: true,
    watchOptions: {
        poll: 1000,     // 每秒内问我1000次是否需要重新打包
        aggregateTimeout: 500,  // 防抖
        ignored: /node_modules/     // 不打包node_modules里面的文件
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
            filename: 'index.html'
        })
    ]
}