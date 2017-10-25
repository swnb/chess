const path = require('path');
const Myplugin = require('swnb-webpack-learning-plugin');
const html_templat_path = path.resolve('./template/template.html');
const resolve = path.resolve;
module.exports = {
    entry: {
        index: path.join(__dirname, 'app', 'index'),
        // markdown: path.join(__dirname, 'app', 'markdown')
        test: resolve(__dirname, 'app', 'test')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, 'app')],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'bower_components')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'app')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css'],
        alias: {
            com: resolve('./app/components'),
            base: resolve('./app/components/base'),
            src: resolve('./app/src/css'),
            util: resolve('./app/util'),
            store: resolve('./app/redux'),
            api: resolve('./app/api')
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join('./dist')
    },
    plugins: [new Myplugin(html_templat_path, { title: 'zzz' })]
};
