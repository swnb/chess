const path = require('path');
const hwp = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, 'app', 'index'),
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
    plugins: [new hwp({ title: 'react' })]
};
