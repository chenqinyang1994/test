const Webapck = require('webpack');
const { smart } = require('webpack-merge');

const base = require('./webpack.base');

module.exports = smart(base, {
    mode: 'production',
    plugins: [
        new Webapck.DefinePlugin({
            DEV: JSON.stringify('prod')
        })
    ]
})