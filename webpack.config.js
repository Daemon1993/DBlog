var path = require('path');
var APP_DIR = path.resolve(__dirname, 'app');
var webpack = require('webpack');

module.exports = {
    entry: [
        // 写在入口文件之前
        "webpack-dev-server/client?http://0.0.0.0:9999",
        "webpack/hot/only-dev-server",
        path.resolve(__dirname, APP_DIR + '/Main.js')
    ],
    output: {
        //打包根目录
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // 提供的访问目录
        publicPath: "/build/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192&name=/imgs/[hash:8].[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: "json",
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
        ]
    },
    // 添加插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};