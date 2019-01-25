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
    // source-map可以增加映射文件，帮助我们调试代码
    // 1）源码映射 会单独生成一个source-map文件，如果代码出错会标识当前报错的行和列（大 且 全）
    // devtool: 'source-map',
    // 2）不会产生单独的文件，但是可以显示行和列
    // devtool: 'eval-source-map',
    // 3）不会产生行，但是是一个单独的映射文件，产生后可以保留起来用来调试（用的不多）
    // devtool: 'cheap-module-source-map',
    // 4）不会产生文件，集成在打包后的文件中，会提示哪一行报错，不会提示列
    // devtool: 'cheap-module-eval-source-map',
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