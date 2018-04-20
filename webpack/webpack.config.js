//webpack必须采用commonjs的写法
let path = require('path');//专门处理路径的
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',//打包后的名字
        path: path.resolve('./dist')//必须是一个绝对路径
    }
};