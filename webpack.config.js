const path = require('path');
const Myplugin = require('swnb-webpack-learning-plugin');
const html_templat_path = path.resolve('./app/template/template.html');
module.exports = {
    entry: {
        index: path.join(__dirname, 'app', 'index'),
        markdown: path.join(__dirname, 'app', 'markdown')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
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
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join('./dist')
    },
    plugins: [new Myplugin(html_templat_path, { title: 'zzz' })]
};
