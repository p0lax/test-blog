var webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname,  "/"),
    entry: {
        app: "./public/js/app.js"
    },
    output: {
        path: "./build",
        filename: "[name].[hash].js"
    },
    module: {
        loaders: [
            { 
                test: /\.jsx$/, 
                loader: "babel", 
                cacheDirectory: true,
                presets: ['react', 'es2015'], 
                exclude: /(bower_components|node_modules|build)/ 
            },
            { test: /\.(css|less)$/, loader: ExtractTextPlugin.extract("style", "css!less") },
            { test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/, loader: "file?limit=20000&name=img/[hash].[ext]" },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=fonts/[hash].[ext]&mimetype=application/font-woff" },
            { test: /\.swf$/, loader: "file-loader?name=fonts/[hash].[ext]" },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=fonts/[hash].[ext]&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: "file?name=fonts/[hash].[ext]&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: "file?name=fonts/[hash].[ext]" },
            { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: "file?name=fonts/[hash].[ext]&mimetype=image/svg+xml" }

        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin("libs", "libs.[hash].js"),
        new ExtractTextPlugin("style.[hash].css", {
            allChunks: false
        })
    ],
    resolve: {
        alias: {},
        extensions: ["", ".js", ".jsx", ".html"]
    }
};