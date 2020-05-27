const path = require('path');

// 模块分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 生成html
const htmlWebpackPlugin = HtmlWebpackPlugin = require('html-webpack-plugin');

// vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        index: './source/main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash:8].js'
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
    plugins: [
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/template/index.html',
            inject: true,
            chunks: ['index'],
            timestamp: new Date().getTime(),
            minify: {
                //删除html的注释
                removeComments: true,
                //删除空格
                collapseWhitespace: true
            }
        })
    ]
}
