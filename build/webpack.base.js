const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'static/js/[name].js',
        path: path.join(__dirname, '../dist'),
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /.(css)$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
        })
    ]
}