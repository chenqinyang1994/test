const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    // entry: './src/index.js',
    entry: path.resolve(__dirname, 'src/index.js'),
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // modules指定解析第三方包的路径（commonjs）
        modules: [path.resolve(__dirname, 'node_modules')],
        // alias可以用来定义别名，比如vue，其实引的是vue.runtime
        // alias: {
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // },
        // extensions可以让我们不写后缀名，下面的规则是如果找不到js就找css，如果找不到css就找json
        extensions: ['.js', '.css', '.json'],
        // mainFields可以更改webpack找第三方模块文件的package.json里面指定的main还是其他的顺序
        // mainFields: ['style', 'main'],
        // // mainFiles可以指定webpack默认找的文件名，一般默认找index，我们不做更改，所以这个一般用不到
        // mainFiles: []
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
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
        }),
    ]
}