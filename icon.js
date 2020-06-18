const generate = require("iconfont-component");
const path = require("path");
function resolve(relativePath) {
  return path.resolve(__dirname, `./${relativePath}`);
}
const iconGenerateConfig = {
  namespace: "super-editor",
  iconCssPath: resolve("src/Icon/icon.css"),
  iconFontFilePath: resolve("src/Icon/fonts"),
  iconComponentPath: resolve("src/Icon/index.tsx"),
};
generate(iconGenerateConfig);
