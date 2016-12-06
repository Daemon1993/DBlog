var path = require('path');
var APP_DIR = path.resolve(__dirname, 'app');
var webpack = require('webpack');

module.exports = {
    entry:[
        // 写在入口文件之前
        "webpack-dev-server/client?http://0.0.0.0:9999",
        "webpack/hot/only-dev-server",
        path.resolve(__dirname, APP_DIR+'/Main.js')
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'static/bundle.js',
        publicPath: "/build"
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192&name=/imgs/[hash:8].[name].[ext]"
            }
        ]
    },
    // 添加插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};