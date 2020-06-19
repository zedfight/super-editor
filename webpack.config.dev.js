const webpack = require("webpack");

const HTMLPlugin = require("html-webpack-plugin");

const config = {
    mode: "development",
    entry: ["webpack-dev-server/client?https://0.0.0.0:8080", "webpack/hot/dev-server", `./src/App.tsx`],
    output: {
        filename: "static/js/[name].js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
        modules: ["./src", "node_modules"],
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /(\.tsx|\.ts)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: "static/font/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.svg/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HTMLPlugin({
            template: `./src/index.html`,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
    ],
};

module.exports = config;
