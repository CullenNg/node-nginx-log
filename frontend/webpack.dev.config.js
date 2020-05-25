var path = require('path');

// 模块分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 生成html
const HtmlWebpackPlugin = htmlWebpackPlugin = require('html-webpack-plugin');

// vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        index: './source/main.js'
    },
    output: {
        path: path.join(__dirname, './develop/'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + "/develop/",
        host: "localhost",
        port: 3002,
        historyApiFallback: false,
        inline: true,
        hot: true,
        hotOnly: true,
        progress: true,
        proxy: {
            '/api/': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': ''
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/template/index.html',
            inject: true,
            chunks: ['index'],
            // 路径源修改
            // static: '/develop',
            timestamp: new Date().getTime(),
            // minify: {
            //删除html的注释
            // removeComments: true,
            //删除空格
            // collapseWhitespace: true
            // }
        }),
    ]
}
