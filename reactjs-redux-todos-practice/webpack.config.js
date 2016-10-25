const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    entry: [
        './src/index.jsx',
    ],
    output: {
        path: `${__dirname}`,
        filename: 'index_bundle.js',
    },
    module: {
        preLoaders: [{
            test: /\.jsx$|\.js$/,
            loader: 'eslint-loader',
            include: `${__dirname}/src`,
            exclude: /bundle\.js$/
        }],
        loaders: [{
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
            },
        }],
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [HTMLWebpackPluginConfig],
};
