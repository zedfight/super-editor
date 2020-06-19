const webpack = require("webpack");
const webpackProdConfig = require("./webpack.config.prod");

const compiler = webpack(webpackProdConfig);

compiler.run((error) => {
    if (error) {
        console.error(error.stack || error);
        if (error.details) console.error(error.details);
        process.exit(1);
    } else {
        console.info("Build successfully");
    }
});
