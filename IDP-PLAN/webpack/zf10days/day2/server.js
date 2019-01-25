let express = require('express');
let webpack = require('webpack');
let app = express();

let middle = require('webpack-dev-middleware');
let config = require('./webpack.config.js');
let complier = webpack(config);

app.use(middle(complier));

app.get('/user', (req, res) => {
    res.json({name: 'zhufeng'})
})

app.listen(3000);