const webpack = require("webpack");

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

const webpackConfig = [
    {
        mode: "production",
        entry: {
            index: `${resolve("src")}/index.tsx`,
            "index.min": `${resolve("src")}/index.tsx`,
        },
        output: {
            path: resolve("dist"),
            filename: "[name].js",
            library: "SUPER_EDITOR",
            libraryTarget: "umd",
            libraryExport: "default",
            globalObject: "this",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
            modules: [resolve("src"), "node_modules"],
        },
        externals: {
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "react",
                root: "React",
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "react-dom",
                root: "ReactDOM",
            },
            "react-dom/server": {
                commonjs: "react-dom/server",
                commonjs2: "react-dom/server",
                amd: "react-dom/server",
                root: "ReactDOMServer",
            },
        },
        optimization: {
            minimizer: [
                new TerserPlugin({include: /index\.min\.js$/}),
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
            maxEntrypointSize: 720000,
            maxAssetSize: 1000000,
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: "ts-loader",
                    include: [resolve("src")],
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
                },
            ],
        },
        plugins: [
            new MiniCSSExtractPlugin(),
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
            new webpack.ProgressPlugin(),
        ],
    },
];

module.exports = webpackConfig;
