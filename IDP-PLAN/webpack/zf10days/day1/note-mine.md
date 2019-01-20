## webpack 

## 安装
- webpack webpack-cli -D  yarn 安装
- webpack-dev-server -D 开发服务器安装
- html-webpack-plugin -D 处理HTML模板

- loader的特点：希望单一   用法：字符串只用一个loader，多个需要用[]
- loader的顺序是默认从右向左、从下到上执行，loader还可以携程对象方式
- css-loader -D 解析@import这种语法的、解析路径
- style-loader -D 它是把css插入到head标签中的
- less less-loader -D 它是把less -> css
- mini-css-extract-plugin -D 它可以把内联式样式转成link标签形式嵌到head里面
- postcss-loader autoprefixer -D    postcss-loader可以用autoprefixer把每个类似transform这样的css3属性加-webkit-这样的属性。需配置好postcss.config.js文件，里面module.exports出一个对象：key是plugins，value是[require('autoprefixer')]
- optimize-css-assets-webpack-plugin -D     这个插件可以优化压缩外链link的css，需要在webpack.config.js里面配置optimization（优化项），optimization里面
- uglifyjs-webpack-plugin -D    这个插件用来压缩js
- @babel/core babel-loader -D    babel的核心库
- @babel/preset-env -D     这个插件可以允许我们使用高级js语法，如箭头函数等，它可以将他们转化成低级的es5
- @babel/plugin-proposal-class-properties -D   这个插件可以将class类等进行转换
- @babel/plugin-proposal-decorators -D  这个插件可以将装饰器等进行转换
- @babel/plugin-transform-runtime -D    @babel/runtime(生产依赖)    @babel/polyfill(生产依赖)   这三个babel插件可以处理类似 "foobar".includes("foo") 这种高级代码，转换成es5等。使用的时候需要在使用这种高级代码的文件里require('@babel/polyfill')
- eslint eslint-loader -D   代码校验，配置loader的时候加一个options:{enforce: 'pre'}意义是先执行这个loader，需要在项目根目录配置.eslintrc.json规则
- expose-loader -D  这个插件可以将变量暴露在全局window上  内联写法：import $ from 'expose-loader?$!jquery';     也可以写在webpack.config.js里面，如下
- 引入webpack插件，webpack.ProvidePlugin，它可以将变量注入到每个模块中（但不会挂到window上）
-   1）expose-loader 暴露到window上
    2）ProvidePlugin 在每个模块中都注入$(在引入的是jQuery的情况下是$)
    3）引入不打包
- file-loader -D    对图片进行处理
- url-loader -D     把较小的图片转成base64，从而减少http请求（但是转成base64后，体积会比之前大1/3）
- html-withimg-loader -D    可以把html模板里面的img标签的图片进行处理
- publicPath 如果它写在output里面，就是所有资源的公共路径，如果写在某个loader里面就是某个资源的公共路径

## 配置
- 默认配置文件的名字：webpack.config.js
- output的path 必须是绝对路径 path.resolve(__dirname, 'dist') 其中filename: 'bundle.[hash].js'操作可以使每次文件修改了，产生不同的bundle.js文件，防止缓存
- devServer的port是端口号，progress为true时开启进度条，contentBase是指定目录来运行静态服务，open为true是开启浏览器，compress为true时启动gzip压缩
- new HtmlWebpackPlugin({
            template: './src/index.html',   //模板入口
            filename: 'index.html',     //输出的html名
            minify: {   //压缩操作
                removeAttributeQuotes: true,    //去掉双引号
                collapseWhitespace: true    //去掉空格和换行
            },
            hash: true  //处理缓存
        })
-   {
        loader: 'style-loader',
        options: {
            insertAt: 'top'     //style-loader的insertAt属性可以让webpack生成的style插入到我们自己写的                        style标签上面，从而让我们自己写的style优先级更高
        }
    }
-   {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,    rules的use里面可以写成这样，去掉style-loader等
            'css-loader'
        ]
    }
-   {
        test: /\.less$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
        ]
    }
-   optimization: {     //优化项
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,    //是否缓存
                parallel: true,     //是否并发处理
                sourceMap: true     //是否使用sourceMap映射源码，方便调试
            }),
            new OptimizeCssAssetsWebpackPlugin({})  //压缩css
        ]
    }
-   {
        test: /.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env'
                ],
                plugins: [
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],  //处理装饰器
                    ["@babel/plugin-proposal-class-properties", { "loose" : true }],     
                    //处理类class
                    ["@babel/plugin-transform-runtime"]
                ],
                exclude: /(node_modules|bower_components)/      
                //不处理node_modules|bower_components文件夹里面的js
            }
        }
    }
-   {
        test: /.js$/,
        use: {
            loader: 'eslint-loader',    //eslint校验代码
            options: {
                enforce: 'pre'  //enforce的属性值有pre、post分别是最先执行、最后执行
            }
        },
        exclude: /node_modules/
    }
-   {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
    }
-   new webpack.ProvidePlugin({     //在每个模块中都注入$
        $: 'jQuery'
    })
-   externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法(module.exports的对象中)
    externals: {
        jquery: "$"
    }
-   {
        test: /.html$/,
        use: 'html-withimg-loader'  //对html模板里面的img标签的图片进行处理
    }
-   {
        test: /.(png|jpg|jpeg|git)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 10*1024,   //当图片大小小于10\*1024的时候进行base64处理
                outputPath: '/assets/src',      //图片的输出路径
                publicPath: 'https://www.cmcm.com'     //图片的公共路径
            }
        }
    }