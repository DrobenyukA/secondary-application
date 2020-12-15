const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 3000,
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            // not allowed to use "-"
            // name: 'secondary-app' will cause an Error Terser Unexpected token: operator (-)
            name: 'secondaryApp',
            library: {
                type: 'var',
                name: 'secondaryApp'
            },
            filename: 'remoteEntry.js',
            exposes: {
                './Button': './src/components/Button',
            },
            shared: {
                react: {
                    singleton: true
                },
                'react-dom': {
                    singleton: true
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js'],
    }
};
