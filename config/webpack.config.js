const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin")
const miniCssextractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { env } = require("process");
module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "[name].js"
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist/"),
        compress: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // { loader: "style-loader" },
                    { loader: miniCssextractPlugin.loader },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // { loader: "style-loader" },
                    { loader: miniCssextractPlugin.loader },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    { loader: miniCssextractPlugin.loader },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ],
            },
            // {
            //     test:/\.(jpg|png|gif|webp|jpeg)$/,
            //     use:[
            //         {loader:"file-loader"}
            //     ]
            // }
            {
                test: /\.(jpg|png|gif|webp|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024000
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /()node_modules|brower_components/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["env"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "网页模板1",
            template: "./src/index.html",
            inject: true,
            minify: {
                removeComments: false,
                removeAttributeQuotes: false,
                collapseWhitespace: false
            },
            chunks:["index"],
            filename: "index.html"
        }),
        new miniCssextractPlugin({
            filename: "[name].css"
        }),
        new CleanWebpackPlugin()
    ]
}