const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(relativePath) {
    return path.resolve(__dirname, `./${relativePath}`);
}

const webpackProdConfig = {
    entry: `${resolve("src")}/index.tsx`,
    output: {
        path: resolve("dist"),
        filename: "js/[name].js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
        modules: [resolve("src"), "node_modules"],
    },
    optimization: {
        minimize: true,
        namedModules: true,
        runtimeChunk: "single",
        splitChunks: {
            automaticNameDelimiter: "-",
            maxAsyncRequests: 12,
        },
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                    },
                },
            }),
        ],
    },
    performance: {
        maxEntrypointSize: 720000 /* 实际大小700kb */,
        maxAssetSize: 1000000,
    },
    loaders: [
        {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
            include: [resolve("src")],
            options: {},
        },
        {
            test: /\.(css|less)$/,
            use: [
                MiniCSSExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        importLoaders: 2,
                    },
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        plugins: () => [autoprefixer],
                    },
                },
                {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true,
                        sourceMap: true,
                    },
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            loader: "file-loader",
            options: {
                name: "font/[name].[hash:8].[ext]",
            },
        },
    ],
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: resolve("tsconfig.json"),
            tslint: resolve("tslint.json"),
            useTypescriptIncrementalApi: false,
            workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
        }),
        new StylelintPlugin({
            configFile: resolve("stylelint.json"),
            context: resolve("src"),
            files: ["**/*.less"],
            syntax: "less",
        }),
    ],
};

module.exports = webpackProdConfig;
