## webpack 

## 笔记
- 打包多页应用：entry里面配多入口，output里面配[name]，有几个页面就new几个HtmlWebpackPlugin插件，HtmlWebpackPlugin参数配置filename是页面名(other.html),chunks是数组，里面对应entry的key
-   source-map可以增加映射文件，帮助我们调试代码
    1）源码映射 会单独生成一个source-map文件，如果代码出错会标识当前报错的行和列（大 且 全）
    devtool: 'source-map',
    2）不会产生单独的文件，但是可以显示行和列
    devtool: 'eval-source-map',
    3）不会产生行，但是是一个单独的映射文件，产生后可以保留起来用来调试（用的不多）
    devtool: 'cheap-module-source-map',
    4）不会产生文件，集成在打包后的文件中，会提示哪一行报错，不会提示列
    devtool: 'cheap-module-eval-source-map',
-   BannerPlugin 是webpack内置插件，可以在打包后的js文件开头声明版权

## 安装
- clean-webpack-plugin -D   这个插件可以帮助我们每次打包的时候删除指定目录（比如dist），免得手动删
- copy-webpack-plugin -D    这个插件可以把指定文件夹里面的文件复制到指定文件夹里面
- webpack-merge -D  这个插件可以帮助我们合并webpack配置文件，如下：
-   const { smart } = require('webpack-merge');
-   const base = require('./webpack.base');
-   module.exports = smart(base, {
        // 这里写新的配置信息
    })
    
## 配置
-   1、打包多页面应用的配置
-   entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other']
        })
    ]

-   2、监控实时打包
-   watch: true,
    watchOptions: {
        poll: 1000,     // 每秒内问我1000次是否需要重新打包
        aggregateTimeout: 500,  // 防抖
        ignored: /node_modules/     // 不打包node_modules里面的文件
    },

-   3、清空指定目录
-   new CleanWebpackPlugin('./dist')

-   4、copy-webpack-plugin
-   new CopyWebpackPlugin([
        {
            from: './doc',  //来源文件夹
            to: './'    //目标路径，如果这里为空，默认是output的path
        }
    ])

-   5、版权声明插件
-   new Webpack.BannerPlugin('made in 2019 by cqy')

-   6、解决跨域问题
-   1）重写path的方式，把请求代理到express服务器上
-   devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
-   2）前端自己想模拟一些数据
-   devServer: {
        before(app) {
            app.get('/user', (req, res) => {
                res.json({name: 'zhufeng-before'})
            })
        }
    }

-   7、resolve属性的配置
-   resolve: {
        // modules指定解析第三方包的路径（commonjs）
        modules: [path.resolve(__dirname, 'node_modules')],
        // alias可以用来定义别名，比如vue，其实引的是vue.runtime
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        },
        // extensions可以让我们不写后缀名，下面的规则是如果找不到js就找css，如果找不到css就找json
        extensions: ['.js', '.css', '.json'],
        // mainFields可以更改webpack找第三方模块文件的package.json里面指定的main还是其他的顺序
        mainFields: ['style', 'main'],
        // mainFiles可以指定webpack默认找的文件名，一般默认找index，我们不做更改，所以这个一般用不到
        mainFiles: []
    }

-   8、定义环境变量
-   new Webpack.DefinePlugin({
        DEV: JSON.stringify('dev'),     // 需要把字符串进行JSON.stringify编译一下，不然webpack会把'dev'识别成dev这样的变量，然后报错：dev is not defined
        FLAG: "true",   // 不进行JSON.stringify会被识别成Boolean的true
        EXPRESSION: '1+1'   // 不进行JSON.stringify会被识别成表达式 1+1 然后结果是num
        的2
    })