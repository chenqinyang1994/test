const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: {     //优化项
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,    //是否缓存
                parallel: true,     //是否并发处理
                sourceMap: true     //是否使用sourceMap映射源码，方便调试
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './build',
        // open: true
    },
    mode: 'production',    // 模式： 生产模式（production）、开发模式（development）
    entry: './src/index.js',    // 入口
    output: {
        filename: 'bundle.[hash].js',  // 输出的文件名
        path: path.resolve(__dirname, 'build'),   // 输出的目录，此处需是绝对路径
        publicPath: 'https://www.baidu.com'
    },
    plugins: [  // 插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: false
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'mian.css'
        }),
        // new webpack.ProvidePlugin({     //在每个模块中都注入$
        //     $: 'jQuery'
        // })
    ],
    externals: {
        jquery: "$"
    },
    module: {   //模块
        rules: [    //规则
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },

            // {
            //     test: /.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre'  //enforce的属性值有pre、post分别是最先执行、最后执行
            //         }
            //     },
            //     exclude: /node_modules/
            // },
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /.(png|jpg|jpeg|git)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: '/assets/src'
                    }
                }
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                },
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}